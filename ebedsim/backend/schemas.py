from pydantic import BaseModel
from datetime import datetime

class EbedBase(BaseModel):
    name: str
    type: str

class EbedCreate(EbedBase):
    pass

class Ebedschema(BaseModel):
    id: int
    name: str
    created_at: datetime
    type: str
    
    class Config:
        from_attributes = True