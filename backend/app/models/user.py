from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):

    __tablename__ = "users"


    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )


    nama: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )


    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )


    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )


    role: Mapped[int] = mapped_column(
        Integer,
        default=2,
        nullable=False
    )