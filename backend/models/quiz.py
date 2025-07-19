from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId

class Question(BaseModel):
    question: str
    options: List[str]
    correct_answer: int  # index of the correct option

class Quiz(BaseModel):
    title: str
    description: Optional[str]
    questions: List[Question]

class QuizOut(Quiz):
    id: str = Field(default_factory=str, alias="_id")
