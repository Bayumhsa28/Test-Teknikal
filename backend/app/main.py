from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.tiket import Tiket

from app.routes.auth import router as auth_router
from app.routes.tiket import router as tiket_router



app = FastAPI()


# Membuat table berdasarkan model
Base.metadata.create_all(bind=engine)


# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Authentication routes
app.include_router(auth_router)


@app.get("/")
def root():

    return {
        "message": "API is running"
    }