import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"

st.title("Register Page")

# User Input
new_username = st.text_input("New Username")
new_password = st.text_input("New Password", type="password")

if st.button("Register"):
    response = requests.post(f"{API_URL}/register", json={"username": new_username, "password": new_password})

    if response.status_code == 200:
        st.success("Registration successful! Redirecting to Login Page...")
        st.switch_page("app.py")
    else:
        st.error(response.json()["detail"])
