
# db/file_database.py
import json
import os
from core.config import DATA_FILE
from core.security import get_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "users.json")

if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump({}, f)

def load_users():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(DATA_FILE, "w") as f:
        json.dump(users, f, indent=4)

def add_user(username, password):
    users = load_users()
    if username in users:
        return False
    users[username] = {"password": get_password_hash(password)}
    save_users(users)
    return True

def get_user(username):
    users = load_users()
    return users.get(username)