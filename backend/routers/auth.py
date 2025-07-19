from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

fake_users_db = {
    "admin@example.com": {"email": "admin@example.com", "password": "admin123"}
}

class LoginData(BaseModel):
    email: str
    password: str

class RegisterData(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(data: LoginData):
    user = fake_users_db.get(data.email)
    if user and user["password"] == data.password:
        return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/register")
async def register(data: RegisterData):
    if data.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    fake_users_db[data.email] = data.dict()
    return {"message": "Registered successfully"}

@router.get("/me")
async def get_current_user():
    return {"email": "admin@example.com"}  # hardcoded for now

@router.post("/logout")
async def logout():
    return {"message": "Logged out"}
