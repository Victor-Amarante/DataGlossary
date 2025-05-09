from sqlalchemy import Column, Integer, Text, DateTime
from database import Base
from datetime import datetime

class QuestionBase(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False, index=True)
    answer = Column(Text, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.now)
    