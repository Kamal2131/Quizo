from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user, auth, quiz

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(user.router, prefix="/api/user", tags=["User"])
app.include_router(quiz.router, prefix="/api/quizzes", tags=["Quiz"])
