from fastapi import FastAPI, status, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Ebed, Fozes
from db import engine, Base, get_db
import time
from schemas import EbedCreate, Ebedschema, Fozesschema
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


def get_meal_names(db: Session):
    meal_names = (
        db.query(Ebed.name)
        .distinct()
        .all()
    )
    return [name for (name,) in meal_names]

def generate_meal_name(meal_names):
    return random.choice(meal_names)


@app.get("/generate-meals")
# eloszor megkell nezni hogy milyen etelek vannak az ebed tablaban
# ezutan kesziteni kell az adatbol 7 random levest es 7 random foetelt ami az elmult 14 napban nap volt
# ezutan a fozes tablaba a datumokhoz hozza kell rendelni ezeket majd vissza adni az adatot

def get_generated_meals(db: Session = Depends(get_db)):
  """   try:
        # Az ételnevek lekérdezése az "ebed" táblából
        meal_names = get_meal_names(db)

        # Az előző 14 napban elkészített ételek lekérése
        end_date = datetime.now()
        start_date = end_date - timedelta(days=14)

        previous_meals = (
            db.query(Ebed)
            .filter(Ebed.created_at >= start_date, Ebed.created_at <= end_date)
            .all()
        )

        previous_meal_names = [meal.name for meal in previous_meals]

        # 7 leves és 7 főétel generálása
        generated_meals = []

        while len(generated_meals) < 7:
            generated_meal_name = generate_meal_name(meal_names)

            # Ellenőrizd, hogy a generált étel neve nem szerepel az előző 14 napban
            if generated_meal_name not in previous_meal_names:
                generated_meals.append(generated_meal_name)

        # A generált ételek elmentése a főzés táblába
        current_datetime = datetime.now()
        for meal_name in generated_meals:
            new_ebed = Ebed(name=meal_name, created_at=current_datetime, type="leves vagy főétel")
            db.add(new_ebed)

        db.commit()

        # Visszaadjuk az új ételeket
        return {"generated_meals": generated_meals}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) """
     