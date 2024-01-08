from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
import logging

SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/geekdb'

# Logoláshoz konfiguráció
logging.basicConfig()
logger = logging.getLogger("db")

# Session letrehozasa
def get_db():
    try:
        engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True, connect_args={"check_same_thread": False})
        db = SessionLocal()
        yield db
    except OperationalError as e:
        logger.error(f"Database connection error: {e}")
        raise
    finally:
        db.close() 

SessionLocal = sessionmaker(autocommit=False, autoflush=False)

Base = declarative_base()
