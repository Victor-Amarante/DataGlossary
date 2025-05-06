# Glossário de Dados com IA/RAG

<!-- ![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge) -->

<img src="./docs/img/glossary.png" alt="Imagem do projeto">
<img src="./docs/img/whatisstd.png" alt="Imagem do projeto com resposta">

> Um assistente virtual inteligente que utiliza tecnologia RAG (Retrieval-Augmented Generation) para responder perguntas sobre terminologia de dados. Alimentado por um Glossário de Dados em formato PDF e potencializado pelos LLMs (Large Language Models), o sistema oferece respostas precisas e contextualizadas sobre conceitos de dados, tornando o aprendizado mais acessível e interativo.

## 🏗️ Arquitetura

- **Backend**: FastAPI + LangChain + FAISS + PostgreSQL  
- **Frontend**: Vite + React + TypeScript + Tailwind CSS  
- **Banco de dados**: armazena histórico de perguntas/respostas  
- **Processo**: faz o _embedding_ dos chunks do PDF e responde buscas semânticas  

---

## ⚙️ Pré-requisitos

- Python 3.10+  
- Node.js 16+ / npm ou yarn  
- PostgreSQL ativo (ou container Docker)  
- Chave de API OpenAI válida  

---

## 🔧 Configuração

1. Clone este repositório:  
   ```bash
   git clone https://github.com/seu-usuario/glossario-dados-ia.git
   cd glossario-dados-ia
   ```

2. Crie o arquivo `.env` na raiz e defina:
   ```env
   # Caminho absoluto para o PDF base
   FILE_PATH=/caminho/para/seu/glossario.pdf

   # Conexão com o banco
   DATABASE_URL=postgresql://usuario:senha@host:porta/nome_db

   # Chave da API OpenAI
   OPENAI_API_KEY=sk-...
   ```
---
### 🚀 Backend

1. Crie e ative um ambiente virtual:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Linux/macOS
   .venv\Scripts\activate      # Windows
   ```

2. Instale dependências:
   ```bash
   pip install -r requirements.txt
   ```

3. Execute o servidor:
   ```bash
   uvicorn backend.main:app --reload
   ```

   - A API ficará disponível em `http://localhost:8000`.  
   - Endpoint principal: `POST /question/`  
   - Esquema de requisição:
     ```json
     { "question": "O que é um data lake?" }
     ```
   - Resposta:
     ```json
     { "answer": "Data lake é ..." }
     ```

---

### 🌐 Frontend

1. Entre na pasta `frontend` e instale pacotes:
   ```bash
   cd frontend
   npm install
   # ou
   yarn
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   - A interface ficará em `http://localhost:5173` (por padrão).  
   - Digite sua pergunta no input e aperte “Perguntar” para receber a resposta em tempo real.

---

## 📦 Build para Produção

- **Backend**: configure um Gunicorn/Uvicorn em ambiente de produção.  
- **Frontend**:
  ```bash
  cd frontend
  npm run build
  ```

---

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

| <a href="https://github.com/Victor-Amarante"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102763898?v=4" width="120px;" alt="Victor Amarante"/></a> | <a href="https://github.com/Marianna-Pinho/"><img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/v2/C4E03AQGeeiEqQmJ-zA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1631844114236?e=1752105600&v=beta&t=4FloLkDZIs0RymO_Y4t4UH3WzzpTeMGkR_uh1_pmu4s" width="120px;" alt="Amarante"/></a> |
| :----: | :----: |
| [Victor Amarante](https://github.com/Victor-Amarante/) | [Marianna Pinho](https://github.com/Marianna-Pinho/) |
