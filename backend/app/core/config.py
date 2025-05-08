# core/config.py

import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings # Using pydantic_settings for type hints and validation
import torch

# Load environment variables from a .env file if it exists
# This should be called before the Settings class is defined
load_dotenv()

# Define a Settings class to hold application configuration
# pydantic_settings.BaseSettings automatically reads environment variables
# that match the field names.
class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    # --- General Settings ---
    APP_NAME: str = "AI TTRPG GM Backend"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ("true", "1") # Example boolean loading

    # --- Firebase Settings ---
    # Path to the Firebase service account key file
    # IMPORTANT: Keep this file secure and DO NOT commit it to Git.
    FIREBASE_SERVICE_ACCOUNT_PATH: str = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH", os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")) # <--- Update default

    # --- AI Model Settings ---
    # The Hugging Face model ID for the Wayfarer model
    MODEL_NAME: str = os.getenv("MODEL_NAME", os.getenv("MODEL_NAME")) # <--- Update default

    # Optional: Device to run the model on ('cuda' or 'cpu')
    DEVICE: str = os.getenv("DEVICE", "cuda" if torch.cuda.is_available() else "cpu") # Requires torch import later if used directly here

    # --- API Settings ---
    # The host and port the FastAPI application will run on
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000)) # Ensure port is an integer

    # --- Security Settings (Example - you'll need more for OAuth2) ---
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-super-secret-key") # <--- **CHANGE THIS IN PRODUCTION**
    ALGORITHM: str = "HS256" # Example algorithm for JWT

    # You can add more settings here as needed, e.g.,
    # DATABASE_URL: str = os.getenv("DATABASE_URL", "mongodb://localhost:27017/") # If using a different DB
    # AI_MAX_TOKENS: int = int(os.getenv("AI_MAX_TOKENS", 250))

    # Pydantic settings configuration
    # This tells BaseSettings where to look for environment variables
    class Config:
        env_file = ".env" # Look for a .env file
        env_file_encoding = 'utf-8' # Specify encoding

# Create a settings instance that can be imported and used throughout the application
settings = Settings()
