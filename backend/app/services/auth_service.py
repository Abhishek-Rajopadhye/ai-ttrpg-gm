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
    
def get_google_oauth_url():
    return (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
        "&response_type=code"
        "&scope=openid%20email%20profile"
    )

def get_github_oauth_url():
    return (
        "https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_REDIRECT_URI}"
        "&scope=read:user user:email"
    )

def handle_google_oauth_callback(code: str):
    # Exchange code for tokens
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
    }
    token_resp = requests.post(token_url, data=data)
    tokens = token_resp.json()
    id_token = tokens.get("id_token")
    if not id_token:
        raise Exception("Google OAuth failed")
    # Sign in/register with Firebase
    firebase_payload = {
        "postBody": f"id_token={id_token}&providerId=google.com",
        "requestUri": settings.GOOGLE_REDIRECT_URI,
        "returnIdpCredential": True,
        "returnSecureToken": True
    }
    firebase_resp = requests.post(settings.FIREBASE_IDP_URL, json=firebase_payload)
    if firebase_resp.status_code != 200:
        raise Exception(firebase_resp.json().get("error", {}).get("message", "Firebase sign-in with Google failed"))
    return firebase_resp.json()

def handle_github_oauth_callback(code: str):
    # Exchange code for access token
    token_url = "https://github.com/login/oauth/access_token"
    data = {
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET,
        "code": code,
        "redirect_uri": settings.GITHUB_REDIRECT_URI,
    }
    headers = {"Accept": "application/json"}
    token_resp = requests.post(token_url, data=data, headers=headers)
    access_token = token_resp.json().get("access_token")
    if not access_token:
        raise Exception("GitHub OAuth failed")
    # Sign in/register with Firebase
    firebase_payload = {
        "postBody": f"access_token={access_token}&providerId=github.com",
        "requestUri": settings.GITHUB_REDIRECT_URI,
        "returnIdpCredential": True,
        "returnSecureToken": True
    }
    firebase_resp = requests.post(settings.FIREBASE_IDP_URL, json=firebase_payload)
    if firebase_resp.status_code != 200:
        raise Exception(firebase_resp.json().get("error", {}).get("message", "Firebase sign-in with GitHub failed"))
    return firebase_resp.json()