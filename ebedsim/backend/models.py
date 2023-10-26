from db import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

class Ebed(Base):
    __tablename__ = 'ebed'
    
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)    
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    type = Column(String, nullable=False)