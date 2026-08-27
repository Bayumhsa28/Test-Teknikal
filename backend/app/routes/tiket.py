from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.tiket import Tiket
from app.schemas.tiket import (
    TiketCreate,
    TiketResponse,
    TiketUpdate
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
        status=data.status
    )

    db.add(tiket)
    db.commit()
    db.refresh(tiket)

    return tiket


# ==========================================
# UPDATE TIKET
# ==========================================

@router.put(
    "/{tiket_id}",
    response_model=TiketResponse
)
def update_tiket(
    tiket_id: int,
    data: TiketUpdate,
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

    tiket.title = data.title
    tiket.description = data.description
    tiket.priority = data.priority
    tiket.status = data.status

    db.commit()
    db.refresh(tiket)

    return tiket