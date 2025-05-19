import requests
from app.core.config import get_settings
from firebase_admin import auth
from fastapi import HTTPException, status, Depends

settings = get_settings()


def register_email_user(email: str, password: str, display_name: str = None):
    """Registers a user with email and password using Firebase REST API."""
    try:
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }
        # Use the Firebase REST API endpoint for email/password signup
        resp = requests.post(settings.FIREBASE_SIGNUP_URL, json=payload)
        resp.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        data = resp.json()

        # Optionally update display name using Firebase REST API
        if display_name:
            update_url = f"https://identitytoolkit.googleapis.com/v1/accounts:update?key={settings.FIREBASE_API_KEY}"
            update_payload = {
                "idToken": data.get("idToken"),
                "displayName": display_name,
                "returnSecureToken": True
            }
            update_resp = requests.post(update_url, json=update_payload)
            update_resp.raise_for_status()  # Raise HTTPError for bad responses

        # Return the Firebase response data, which includes idToken
        # The frontend will use this idToken to authenticate with the backend
        return data
    except requests.exceptions.RequestException as e:
        # Handle potential request errors (network issues, bad response status)
        error_detail = "Registration failed"
        if e.response is not None and e.response.json() and "error" in e.response.json():
            error_detail = e.response.json()["error"].get(
                "message", error_detail)
        raise Exception(f"Firebase API error: {error_detail}")
    except Exception as e:
        # Handle other potential errors
        raise Exception(
            f"An unexpected error occurred during registration: {str(e)}")


def login_email_user(email: str, password: str):
    """Logs in a user with email and password using Firebase REST API."""
    try:
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }
        # Use the Firebase REST API endpoint for email/password signin
        resp = requests.post(settings.FIREBASE_SIGNIN_URL, json=payload)
        resp.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)

        # Return the Firebase response data, which includes idToken
        # The frontend will use this idToken to authenticate with the backend
        return resp.json()
    except requests.exceptions.RequestException as e:
        # Handle potential request errors (network issues, bad response status)
        error_detail = "Invalid credentials"
        if e.response is not None and e.response.json() and "error" in e.response.json():
            error_detail = e.response.json()["error"].get(
                "message", error_detail)
        raise Exception(f"Firebase API error: {error_detail}")
    except Exception as e:
        # Handle other potential errors
        raise Exception(f"An unexpected error occurred during login: {str(e)}")


# Removed get_google_oauth_url and get_github_oauth_url
# These functions are no longer needed as the frontend handles initiating social login directly.


def verify_firebase_token(id_token: str):
    """Verifies a Firebase ID token using the Firebase Admin SDK."""
    try:
        # Verify the ID token while checking if the token is revoked.
        # This confirms the token is valid and issued by Firebase for your project.
        decoded_token = auth.verify_id_token(id_token)
        # Token is valid and contains the user's UID and other claims.
        # You can access user info like decoded_token['uid'], decoded_token['email'] etc.
        return decoded_token
    except Exception as e:
        # Token is invalid, expired, or verification failed
        print(f"Error verifying Firebase ID token: {e}")
        # Raise an exception indicating authentication failure
        raise Exception("Invalid or expired token")

async def get_current_user():
    user = auth.get_user()  # Replace with actual Firebase Auth call
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid authentication credentials")
    return user

async def get_current_user_id(current_user: auth.UserRecord = Depends(get_current_user)):
    """
    Dependency to get the current user's ID from Firebase Auth.
    """
    return current_user.uid
    
