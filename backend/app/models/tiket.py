from datetime import datetime

from sqlalchemy import String, Text, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Tiket(Base):

    __tablename__ = "tiket"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="medium"
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="open"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    update_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )