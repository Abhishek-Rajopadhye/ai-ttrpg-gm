from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env

app = FastAPI()

# Example Root Endpoint
@app.get("/")
def read_root():
    return {"Hello": "AI TTRPG GM Backend"}

# Add routes for auth, game sessions, AI interaction later
# from .routers import auth, games # Example of structuring routes
# app.include_router(auth.router)
# app.include_router(games.router)

# Firebase Initialization (add configuration later)
# import firebase_admin
# from firebase_admin import credentials, firestore
#
# cred = credentials.Certificate("path/to/your/firebase/serviceAccountKey.json") # Get this from Firebase console
# firebase_admin.initialize_app(cred)
# db = firestore.client()

# LLM Initialization (add API key from .env)
# import google.generativeai as genai
# API_KEY = os.getenv("GEMINI_API_KEY")
# genai.configure(api_key=API_KEY)
# model = genai.GenerativeModel('gemini-pro') # Choose your model

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)