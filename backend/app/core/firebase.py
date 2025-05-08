import firebase_admin
from firebase_admin import credentials, auth, firestore
from core.config import get_settings

settings = get_settings()

# Lazy singleton pattern to prevent multiple initializations
firebase_app = None
firebase_db = None

def init_firebase():
    global firebase_app, firebase_db
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
        firebase_app = firebase_admin.initialize_app(cred)
        firebase_db = firestore.client()
    return firebase_app, firebase_db


def verify_id_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise ValueError("Invalid token") from e
