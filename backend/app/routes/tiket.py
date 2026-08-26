from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.tiket import Tiket
from app.schemas.tiket import TiketCreate, TiketResponse


router = APIRouter(
    prefix="/api/tiket",
    tags=["Tiket"]
)


@router.post(
    "",
    response_model=TiketResponse,
    status_code=201
)
def create_tiket(
    tiket: TiketCreate,
    db: Session = Depends(get_db)
):
    if tiket.priority not in ["low", "medium", "high"]:
        raise HTTPException(
            status_code=400,
            detail="Priority harus low, medium, atau high"
        )

    if tiket.status not in ["open", "in_progress", "closed"]:
        raise HTTPException(
            status_code=400,
            detail="Status harus open, in_progress, atau closed"
        )

    new_tiket = Tiket(
        title=tiket.title,
        description=tiket.description,
        priority=tiket.priority,
        status=tiket.status
    )

    db.add(new_tiket)
    db.commit()
    db.refresh(new_tiket)

    return new_tiket