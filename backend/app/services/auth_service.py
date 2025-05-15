import os
import requests
from app.core.config import get_settings

settings = get_settings()

def register_email_user(email: str, password: str, display_name: str = None):
    try:
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }
        resp = requests.post(settings.FIREBASE_SIGNUP_URL, json=payload)
        if resp.status_code != 200:
            raise Exception(resp.json().get("error", {}).get("message", "Registration failed"))
        data = resp.json()
        # Optionally update display name
        if display_name:
            update_url = f"https://identitytoolkit.googleapis.com/v1/accounts:update?key={settings.FIREBASE_API_KEY}"
            update_payload = {
                "idToken": data.get("idToken"),
                "displayName": display_name,
                "returnSecureToken": True
            }
            requests.post(update_url, json=update_payload)
        return data
    except Exception as e:
        raise Exception(str(e))

def login_email_user(email: str, password: str):
    try:
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }
        resp = requests.post(settings.FIREBASE_SIGNIN_URL, json=payload)
        if resp.status_code != 200:
            raise Exception("Invalid credentials")
        return resp.json()
    except Exception as e:
        raise Exception(str(e))

def register_github_user(access_token: str):
    # This is the same as login for OAuth with Firebase REST API
    return login_github_user(access_token)

def login_github_user(access_token: str):
    try:
        github_redirect_uri = os.getenv("GITHUB_REDIRECT_URI", "http://localhost")
        firebase_payload = {
            "postBody": f"access_token={access_token}&providerId=github.com",
            "requestUri": github_redirect_uri,
            "returnIdpCredential": True,
            "returnSecureToken": True
        }
        firebase_resp = requests.post(settings.FIREBASE_IDP_URL, json=firebase_payload)
        if firebase_resp.status_code != 200:
            raise Exception(firebase_resp.json().get("error", {}).get("message", "Firebase sign-in with GitHub failed"))
        return firebase_resp.json()
    except Exception as e:
        raise Exception(str(e))

def register_google_user(id_token: str):
    # This is the same as login for OAuth with Firebase REST API
    return login_google_user(id_token)

def login_google_user(id_token: str):
    try:
        google_redirect_uri = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost")
        firebase_payload = {
            "postBody": f"id_token={id_token}&providerId=google.com",
            "requestUri": google_redirect_uri,
            "returnIdpCredential": True,
            "returnSecureToken": True
        }
        firebase_resp = requests.post(settings.FIREBASE_IDP_URL, json=firebase_payload)
        if firebase_resp.status_code != 200:
            raise Exception(firebase_resp.json().get("error", {}).get("message", "Firebase sign-in with Google failed"))
        return firebase_resp.json()
    except Exception as e:
        raise Exception(str(e))