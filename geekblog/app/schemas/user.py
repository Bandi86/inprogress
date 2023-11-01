from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    email: str
    password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    role: str
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True