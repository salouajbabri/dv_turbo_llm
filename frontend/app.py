import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"

# Session State to manage user authentication
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False
    st.session_state.token = None

st.title("Login Page")

# User Input
username = st.text_input("Username")
password = st.text_input("Password", type="password")

if st.button("Login"):
    response = requests.post(f"{API_URL}/login", json={"username": username, "password": password})

    if response.status_code == 200:
        st.success("Login successful!")
        st.session_state.logged_in = True
        st.session_state.token = response.json()["token"]
        st.experimental_rerun()
    else:
        st.error("Invalid credentials. Redirecting to Register Page...")
        st.switch_page("pages/register.py")  # Redirect to register page

if st.session_state.logged_in:
    st.success(f"Welcome {username}!")
    st.switch_page("pages/home.py")  # Redirect to home page
