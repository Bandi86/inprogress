from fastapi import FastAPI, status, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Ebed
from db import engine, Base, get_db
import time
from schemas import EbedCreate, Ebedschema
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

# Database connection setup
def create_db_connection():
    while True:
        try:
            conn = psycopg2.connect(
                host='localhost',
                database='ebedsim',
                user='postgres',
                password='postgres',
                cursor_factory=RealDictCursor
            )
            cursor = conn.cursor()
            print('Database connection was successful')
            return conn, cursor
        except Exception as error:
            print('Connecting to the database failed')
            print('Error:', error)
            time.sleep(5)

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"Hello": "Welcome to my API"}

@app.get("/ebeds")
def get_ebeds(db: Session = Depends(get_db)):
    osszes_ebed = db.query(Ebed).all()
    return osszes_ebed

@app.get("/ebeds/{id}")
def get_ebed(id: int, db: Session = Depends(get_db)):
    post = db.query(Ebed).filter(Ebed.id == id).first()
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No such id: {id}"
        )
    return post

@app.post("/ebeds", status_code=status.HTTP_201_CREATED, response_model=Ebedschema)
def create_ebed(ebed: EbedCreate, db: Session = Depends(get_db)):
    new_ebed = Ebed(**ebed.model_dump())
    db.add(new_ebed)
    db.commit()
    db.refresh(new_ebed)
    return new_ebed
