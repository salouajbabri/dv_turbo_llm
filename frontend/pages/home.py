import streamlit as st

st.title("Home Page")

if "logged_in" in st.session_state and st.session_state.logged_in:
    st.success("You are logged in!")
else:
    st.error("Unauthorized! Redirecting to Login...")
    st.switch_page("app.py")  # Redirect to login page
