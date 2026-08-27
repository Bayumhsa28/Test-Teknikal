from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.tiket import Tiket
from app.schemas.tiket import (
    TiketCreate,
    TiketResponse,
    TiketUpdateUser,
    TiketUpdateAdmin
)


router = APIRouter(
    prefix="/api/tiket",
    tags=["Tiket"]
)


# ==========================================
# GET SEMUA TIKET
# ==========================================

@router.get(
    "",
    response_model=list[TiketResponse]
)
def get_tiket(
    db: Session = Depends(get_db)
):

    tiket = (
        db.query(Tiket)
        .order_by(Tiket.id.desc())
        .all()
    )

    return tiket


# ==========================================
# GET TIKET BERDASARKAN ID
# ==========================================

@router.get(
    "/{tiket_id}",
    response_model=TiketResponse
)
def get_tiket_by_id(
    tiket_id: int,
    db: Session = Depends(get_db)
):

    tiket = (
        db.query(Tiket)
        .filter(Tiket.id == tiket_id)
        .first()
    )

    if not tiket:
        raise HTTPException(
            status_code=404,
            detail="Tiket tidak ditemukan"
        )

    return tiket


# ==========================================
# CREATE TIKET
# Status selalu OPEN
# ==========================================

@router.post(
    "",
    response_model=TiketResponse,
    status_code=201
)
def create_tiket(
    data: TiketCreate,
    db: Session = Depends(get_db)
):

    tiket = Tiket(
        title=data.title,
        description=data.description,
        priority=data.priority,

        # Status selalu open ketika tiket dibuat
        status="open"
    )

    db.add(tiket)
    db.commit()
    db.refresh(tiket)

    return tiket


# ==========================================
# UPDATE TIKET USER
# User:
# - title
# - description
# - priority
# 
# Status tidak dapat diubah
# ==========================================

@router.put(
    "/{tiket_id}",
    response_model=TiketResponse
)
def update_tiket_user(
    tiket_id: int,
    data: TiketUpdateUser,
    db: Session = Depends(get_db)
):

    tiket = (
        db.query(Tiket)
        .filter(Tiket.id == tiket_id)
        .first()
    )

    if not tiket:
        raise HTTPException(
            status_code=404,
            detail="Tiket tidak ditemukan"
        )

    # User hanya boleh mengubah data berikut
    tiket.title = data.title
    tiket.description = data.description
    tiket.priority = data.priority

    # Status TIDAK diubah

    db.commit()
    db.refresh(tiket)

    return tiket


# ==========================================
# UPDATE TIKET ADMIN
# Admin:
# - title
# - description
# - priority
# - status
# ==========================================

@router.put(
    "/admin/{tiket_id}",
    response_model=TiketResponse
)
def update_tiket_admin(
    tiket_id: int,
    data: TiketUpdateAdmin,
    db: Session = Depends(get_db)
):

    tiket = (
        db.query(Tiket)
        .filter(Tiket.id == tiket_id)
        .first()
    )

    if not tiket:
        raise HTTPException(
            status_code=404,
            detail="Tiket tidak ditemukan"
        )

    # Admin dapat mengubah semua data
    tiket.title = data.title
    tiket.description = data.description
    tiket.priority = data.priority
    tiket.status = data.status

    db.commit()
    db.refresh(tiket)

    return tiket


# ==========================================
# DELETE TIKET
# ==========================================

@router.delete(
    "/{tiket_id}",
    status_code=204
)
def delete_tiket(
    tiket_id: int,
    db: Session = Depends(get_db)
):

    tiket = (
        db.query(Tiket)
        .filter(Tiket.id == tiket_id)
        .first()
    )

    if not tiket:
        raise HTTPException(
            status_code=404,
            detail="Tiket tidak ditemukan"
        )

    db.delete(tiket)
    db.commit()

    return None