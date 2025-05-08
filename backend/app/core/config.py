from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Literal
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "AI-TTRPG-GM"
    ENV: Literal["development", "production"] = "development"
    DEBUG: bool = True
    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # Firebase
    FIREBASE_SERVICE_ACCOUNT_KEY_PATH: str

    # Model
    MODEL_NAME: str
    HF_API_KEY: str


    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings():
    return Settings()
