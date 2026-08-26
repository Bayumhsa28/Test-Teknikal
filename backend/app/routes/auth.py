from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from pwdlib import PasswordHash

from app.database import get_db
from app.models.user import User

from app.schemas.user import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    LoginResponse
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


password_hash = PasswordHash.recommended()


# ==========================================
# REGISTER
# ==========================================

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):

    # Cek apakah email sudah terdaftar

    existing_user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )


    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email sudah terdaftar"
        )


    # Hash password

    hashed_password = password_hash.hash(
        data.password
    )


    # Membuat user baru

    new_user = User(

        nama=data.nama,

        email=data.email,

        password=hashed_password,

        role=2

    )


    # Simpan ke database

    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return new_user


# ==========================================
# LOGIN
# ==========================================

@router.post(
    "/login",
    response_model=LoginResponse
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )


    if not user:

        raise HTTPException(
            status_code=401,
            detail="Email atau password salah"
        )


    password_valid = password_hash.verify(
        data.password,
        user.password
    )


    if not password_valid:

        raise HTTPException(
            status_code=401,
            detail="Email atau password salah"
        )


    return {
        "access_token": "sementara",
        "token_type": "bearer",
        "user": user
    }