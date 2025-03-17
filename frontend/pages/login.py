import streamlit as st
from utils.api import login_user

def login_page():
    st.title("Login")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    
    if st.button("Login"):
        response = login_user(username, password)
        if response["redirect"] == "home":
            st.session_state["current_page"] = "home"
            st.experimental_rerun()  # Forces page refresh
        elif response["redirect"] == "register":
            st.warning("User not found. Redirecting to registration.")
            st.session_state["current_page"] = "register"
            st.experimental_rerun()

