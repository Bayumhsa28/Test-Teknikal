from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):

    nama: str = Field(
        min_length=1,
        max_length=100
    )

    email: EmailStr

    password: str = Field(
        min_length=6
    )


class LoginRequest(BaseModel):

    email: EmailStr

    password: str


class UserResponse(BaseModel):

    id: int
    nama: str
    email: EmailStr
    role: int

    class Config:
        from_attributes = True


class LoginResponse(BaseModel):

    access_token: str
    token_type: str
    user: UserResponse