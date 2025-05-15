import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import get_settings
import os
settings = get_settings()

# Lazy singleton pattern to prevent multiple initializations
firebase_app = None
firebase_db = None

if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)
    firebase_db = firestore.client()
else:
    firebase_app = firebase_admin.get_app()
    firebase_db = firestore.client(firebase_app)
