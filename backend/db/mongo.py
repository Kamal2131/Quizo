### backend/db/mongo.py
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["quizmaster"]

def get_collection(name: str):
    return db[name]

