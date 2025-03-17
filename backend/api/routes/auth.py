from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from db.file_database import add_user, get_user
from core.security import verify_password

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login/")
def login_user(request: LoginRequest):
    user = get_user(request.username)
    if user and verify_password(request.password, user["password"]):
        return {"message": "Login successful", "redirect": "home"}
    return {"message": "User not found", "redirect": "register"}

@router.post("/register/")
def register_user(request: LoginRequest):
    if add_user(request.username, request.password):
        return {"message": "User registered successfully", "redirect": "login"}
    raise HTTPException(status_code=400, detail="Username already registered")