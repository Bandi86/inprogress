from app.models.user import User
from app.schemas.user import User, UserCreate
from app.utils import hash
from app.db import get_db
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/api/users",
    tags=['Users']
)

# All User

router.get("/", response_model = User)
def get_all_users(db: Session = Depends(get_db), ):
    users = db.query(User).all()    
    return users

# User by id

router.get("/{id}", response_model = User)
def get_user_by_id(id: int, db: Session = Depends(get_db), ):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")

# Create User

router.post("/", status_code=status.HTTP_201_CREATED, response_model = User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    # hash the password - user.password
    hashed_password = hash(user.password)
    user.password = hashed_password

    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

