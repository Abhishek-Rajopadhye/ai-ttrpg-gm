import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import get_settings

settings = get_settings()

firebase_app = None
firebase_db = None

if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)
    firebase_db = firestore.client()
else:
    firebase_app = firebase_admin.get_app()
    firebase_db = firestore.client(firebase_app)


# Helper function to get a document by ID
def get_document(collection: str, doc_id: str):
    """Fetches a single document from Firestore."""
    doc_ref = firebase_db.collection(collection).document(doc_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return None

# Helper function to get documents by user ID
def get_user_documents(collection: str, user_id: str):
    """Fetches documents from a collection filtered by user_id."""
    docs = firebase_db.collection(collection).where("user_id", "==", user_id).stream()
    return [doc.to_dict() for doc in docs]

# Helper function to create a document
def create_document(collection: str, data: dict):
    """Creates a new document in Firestore."""
    doc_ref = firebase_db.collection(collection).document()
    doc_ref.set(data)
    return doc_ref.id

# Helper function to update a document
def update_document(collection: str, doc_id: str, data: dict):
    """Updates an existing document in Firestore."""
    doc_ref = firebase_db.collection(collection).document(doc_id)
    doc_ref.update(data)

# Helper function to delete a document
def delete_document(collection: str, doc_id: str):
    """Deletes a document from Firestore."""
    firebase_db.collection(collection).document(doc_id).delete()
