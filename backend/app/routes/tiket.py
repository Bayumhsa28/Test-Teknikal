from fastapi import APIRouter, Depends
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