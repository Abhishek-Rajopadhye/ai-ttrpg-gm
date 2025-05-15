from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Literal
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "AI-TTRPG-GM"
    ENV: Literal["development", "production"] = "development"
    DEBUG: bool = True
    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # Firebase
    FIREBASE_CREDENTIALS_PATH: str
    FIREBASE_API_KEY: str
    FIREBASE_SIGNIN_URL: str = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"
    FIREBASE_SIGNUP_URL: str = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_APIKEY}"
    FIREBASE_IDP_URL: str = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key={FIREBASE_API_KEY}"
    
    # Model
    MODEL_NAME: str
    HF_API_KEY: str
    PROVIDER: str

    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str
    
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str
    GITHUB_REDIRECT_URI: str
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings():
    return Settings()
