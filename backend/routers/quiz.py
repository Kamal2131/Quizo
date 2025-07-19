from fastapi import APIRouter, HTTPException
from models.quiz import Quiz, QuizOut
from db.mongo import get_collection
from bson import ObjectId

router = APIRouter()
quiz_collection = get_collection("quizzes")

@router.get("/", response_model=list[QuizOut])
async def get_quizzes():
    quizzes = list(quiz_collection.find())
    for q in quizzes:
        q["_id"] = str(q["_id"])
    return quizzes

@router.get("/{quiz_id}", response_model=QuizOut)
async def get_quiz(quiz_id: str):
    quiz = quiz_collection.find_one({"_id": ObjectId(quiz_id)})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    quiz["_id"] = str(quiz["_id"])
    return quiz

@router.post("/", response_model=QuizOut)
async def create_quiz(quiz: Quiz):
    result = quiz_collection.insert_one(quiz.dict())
    quiz = quiz_collection.find_one({"_id": result.inserted_id})
    quiz["_id"] = str(quiz["_id"])
    return quiz

@router.put("/{quiz_id}", response_model=QuizOut)
async def update_quiz(quiz_id: str, updated_quiz: Quiz):
    quiz_collection.update_one({"_id": ObjectId(quiz_id)}, {"$set": updated_quiz.dict()})
    quiz = quiz_collection.find_one({"_id": ObjectId(quiz_id)})
    quiz["_id"] = str(quiz["_id"])
    return quiz

@router.delete("/{quiz_id}")
async def delete_quiz(quiz_id: str):
    result = quiz_collection.delete_one({"_id": ObjectId(quiz_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return {"message": "Quiz deleted successfully"}
