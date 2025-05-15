from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials
from app.services.auth_service import (
    register_email_user,
    register_github_user,
    register_google_user,
    login_email_user,
    login_github_user,
    login_google_user,
)

import os

router = APIRouter()

# Initialize Firebase Admin SDK (ensure this runs only once)
if not firebase_admin._apps:
    cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
    firebase_admin.initialize_app(cred)

class EmailPasswordLogin(BaseModel):
    email: str
    password: str

class EmailPasswordRegister(BaseModel):
    email: str
    password: str
    display_name: str = None

@router.post("/register/email")
async def register_email(data: EmailPasswordRegister):
    try:
        return register_email_user(data.email, data.password, data.display_name)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/register/github")
async def register_github(access_token: str = Body(..., embed=True)):
    try:
        return register_github_user(access_token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/register/google")
async def register_google(id_token: str = Body(..., embed=True)):
    try:
        return register_google_user(id_token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login/email")
async def login_email(data: EmailPasswordLogin):
    try:
        return login_email_user(data.email, data.password)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/login/github")
async def login_github(access_token: str = Body(..., embed=True)):
    try:
        return login_github_user(access_token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/login/google")
async def login_google(id_token: str = Body(..., embed=True)):
    try:
        return login_google_user(id_token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))