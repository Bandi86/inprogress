from db import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Ebed(Base):
    __tablename__ = 'ebed'
    
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)    
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    type = Column(String, nullable=False)
    
     # Kapcsolat a főzési időpontokhoz
    cook_dates = relationship('Fozes', back_populates='ebed')

class Fozes(Base):
    __tablename__ = 'fozes'
    
    id = Column(Integer, primary_key=True, nullable=False)
    cook_date = Column(TIMESTAMP(timezone=True), nullable=False)
    
    # Kapcsolat az ételekhez
    ebed_id = Column(Integer, ForeignKey('ebed.id'))
    ebed = relationship('Ebed', back_populates='cook_dates')