from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import json
import bcrypt
import jwt
import datetime

app = FastAPI()

USER_DB_FILE = "C:/USERS/SJBABRI/DOCUMENTS/DV_TURBO_LLM/BACKEND/users.json"
SECRET_KEY = "mysecretkey"

# Pydantic models
class User(BaseModel):
    username: str
    password: str

# Load users from JSON
def load_users():
    try:
        with open(USER_DB_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Save users to JSON
def save_users(users):
    with open(USER_DB_FILE, "w") as file:
        json.dump(users, file, indent=4)

# Hash password
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verify password
def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Generate JWT Token
def create_jwt(username):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({"sub": username, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    return token

# Login Endpoint
@app.post("/login")
def login(user: User):
    users = load_users()
    
    for u in users:
        if u["username"] == user.username and verify_password(user.password, u["password"]):
            return {"message": "Login successful", "token": create_jwt(user.username)}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Register Endpoint
@app.post("/register")
def register(user: User):
    users = load_users()
    
    # Check if user exists
    if any(u["username"] == user.username for u in users):
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Add new user
    users.append({"username": user.username, "password": hash_password(user.password)})
    save_users(users)
    
    return {"message": "User registered successfully"}
