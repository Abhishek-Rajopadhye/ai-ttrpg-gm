from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials
from fastapi.responses import RedirectResponse
from app.services.auth_service import (
    login_email_user,
    register_email_user,
    get_google_oauth_url,
    get_github_oauth_url,
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

@router.get("/login/email")
async def login_email(data: EmailPasswordLogin):
    try:
        return login_email_user(data.email, data.password)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.get("/login/google")
async def login_google():
    return RedirectResponse(get_google_oauth_url())

@router.get("/login/github")
async def login_github():
    return RedirectResponse(get_github_oauth_url())
