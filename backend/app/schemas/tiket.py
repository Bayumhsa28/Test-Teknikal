from datetime import datetime

from pydantic import BaseModel


# ==========================================
# CREATE TIKET
# ==========================================

class TiketCreate(BaseModel):
    title: str
    description: str
    priority: str = "medium"
    status: str = "open"


# ==========================================
# UPDATE TIKET USER
# User tidak dapat mengubah status
# ==========================================

class TiketUpdateUser(BaseModel):
    title: str
    description: str
    priority: str


# ==========================================
# UPDATE TIKET ADMIN
# Admin dapat mengubah status
# ==========================================

class TiketUpdateAdmin(BaseModel):
    title: str
    description: str
    priority: str
    status: str


# ==========================================
# RESPONSE TIKET
# ==========================================

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