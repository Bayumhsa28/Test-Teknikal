from datetime import datetime

from pydantic import BaseModel, Field


class TiketCreate(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)
    priority: str = "medium"
    status: str = "open"


class TiketResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    created_at: datetime
    update_at: datetime

    class Config:
        from_attributes = True