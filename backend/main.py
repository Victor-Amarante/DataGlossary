import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File
from typing import Annotated
from sqlalchemy.orm import Session
from . import models
from . import schemas
from .database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import shutil
from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

load_dotenv()

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

PDF_PATH = os.getenv('FILE_PATH')

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://data-glossary.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carrega e processa o PDF específico
loader = PyPDFLoader(PDF_PATH)
docs = loader.load()

splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100, separator="\n")
chunks = splitter.split_documents(docs)

embeddings = OpenAIEmbeddings()
vector_store = FAISS.from_documents(chunks, embeddings)

retriever = vector_store.as_retriever()
qa_chain = RetrievalQA.from_chain_type(llm=ChatOpenAI(), retriever=retriever)

@app.post("/question/")
async def question(question: schemas.Question, db: Session = Depends(get_db)):
    """Endpoint para fazer perguntas sobre o PDF"""
    if qa_chain is None:
        raise HTTPException(
            status_code=400, 
            detail="Nenhum PDF foi processado. Por favor, faça upload de um PDF primeiro."
        )
    
    try:
        answer = qa_chain.invoke(question.question)
        # Se a resposta for um dicionário, pegamos apenas o campo 'result'
        if isinstance(answer, dict):
            answer = answer.get('result', str(answer))
            
        db_question = models.QuestionBase(question=question.question, answer=answer)
        db.add(db_question)
        db.commit()
        db.refresh(db_question)

        return {"answer": answer}
    except Exception as e:
      raise HTTPException(
            status_code=500,
            detail=str(e)
        )
