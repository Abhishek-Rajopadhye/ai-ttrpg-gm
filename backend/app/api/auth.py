from fastapi import APIRouter, Depends, HTTPException, Body, Header
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials
from fastapi.responses import JSONResponse  # Import JSONResponse
from app.services.auth_service import (
    login_email_user,
    register_email_user,
    verify_firebase_token  # Import the new verification function
)

from app.core.config import get_settings
import os

settings = get_settings()

router = APIRouter()

if not firebase_admin._apps:
    try:
        # Ensure the environment variable is set and the path is correct
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
        if not cred_path:
            raise ValueError(
                "FIREBASE_CREDENTIALS_PATH environment variable not set.")
        if not os.path.exists(cred_path):
            raise FileNotFoundError(
                f"Firebase credentials file not found at: {cred_path}")

        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        # Log successful initialization
        print("Firebase Admin SDK initialized successfully.")
    except (ValueError, FileNotFoundError) as e:
        print(f"Error initializing Firebase Admin SDK: {e}")
        # Depending on your application's needs, you might want to exit or handle this differently
        # For production, you'd want robust error handling here.
    except Exception as e:
        print(
            f"An unexpected error occurred during Firebase Admin SDK initialization: {e}"
        )


class EmailPasswordLogin(BaseModel):
    email: str
    password: str


class EmailPasswordRegister(BaseModel):
    email: str
    password: str
    display_name: str = None


@router.post("/register/email")
async def register_email(data: EmailPasswordRegister):
    """Handles email/password registration."""
    try:
        # The auth_service function handles the registration and returns Firebase data including idToken
        firebase_data = register_email_user(data.email, data.password,
                                            data.display_name)
        # Return the Firebase data to the frontend. The frontend will use the idToken.
        return JSONResponse(
            content={
                "message": "User registered successfully",
                "firebase_data": firebase_data
            })
    except Exception as e:
        # Catch exceptions from the service layer and return appropriate HTTP response
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login/email")  # Changed to POST as it sends sensitive data
async def login_email(data: EmailPasswordLogin):
    """Handles email/password login."""
    try:
        # The auth_service function handles the login and returns Firebase data including idToken
        firebase_data = login_email_user(data.email, data.password)
        # Return the Firebase data to the frontend. The frontend will use the idToken.
        return JSONResponse(content={
            "message": "Login successful",
            "firebase_data": firebase_data
        })
    except Exception as e:
        # Catch exceptions from the service layer and return appropriate HTTP response
        raise HTTPException(status_code=401, detail=str(e))


# Removed /login/google and /login/github endpoints
# These are now handled directly by the frontend Firebase SDK.

# The verify-token endpoint remains crucial for backend authentication


@router.post("/verify-token")
async def verify_token(id_token: str = Body(..., embed=True)):
    """Verifies a Firebase ID token received from the frontend."""
    try:
        # Use the auth_service function to verify the token
        decoded_token = verify_firebase_token(id_token)
        # The decoded_token contains user information (uid, email, etc.)
        # This confirms the user's identity to the backend.
        return JSONResponse(content={
            "message": "Token verified successfully",
            "user": decoded_token
        })
    except Exception as e:
        # If token verification fails, return 401 Unauthorized
        raise HTTPException(status_code=401, detail=str(e))


# You can create a dependency to easily protect endpoints


async def get_current_user(id_token: str = Header(..., alias="Authorization")):
    """FastAPI dependency to get the current authenticated user from the Firebase ID token."""
    try:
        # Assuming the token is sent in the Authorization header as "Bearer <id_token>"
        # Extract the token part
        if not id_token.startswith("Bearer "):
            raise ValueError(
                "Invalid Authorization header format. Expected 'Bearer <token>'"
            )
        token = id_token.split(" ")[1]

        # Verify the token using the service function
        decoded_token = verify_firebase_token(token)
        # Return the decoded token (containing user info)
        return decoded_token
    except (ValueError, Exception) as e:
        # If verification fails, raise HTTPException
        raise HTTPException(status_code=401,
                            detail=f"Authentication failed: {str(e)}")


# Example of a protected endpoint using the dependency


@router.get("/protected-data")
async def get_protected_data(current_user: dict = Depends(get_current_user)):
    """Example protected endpoint requiring a valid Firebase ID token."""
    # The 'current_user' parameter will contain the decoded Firebase ID token
    # if the token verification in the dependency was successful.
    user_uid = current_user.get('uid')
    user_email = current_user.get('email', 'N/A')

    return {
        "data": f"This is protected data for user {user_uid} ({user_email})"
    }
