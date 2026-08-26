from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


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


@app.get("/api/users")
def get_users():
    return [
        {
            "id": 1,
            "name": "Bayu"
        },
        {
            "id": 2,
            "name": "Andi"
        }
    ]