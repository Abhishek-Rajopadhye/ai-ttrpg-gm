# services/character_service.py
from typing import Optional, List
from app.db.character import Character, CharacterCreate, CharacterUpdate
from app.core.firebase import firebase_db, get_document, get_user_documents, create_document, update_document, delete_document

COLLECTION_NAME = "characters"

def create_character(user_id: str, character_data: CharacterCreate) -> Character:
    """
    Creates a new character for a specific user in Firestore.
    """
    data = character_data.model_dump()
    data["user_id"] = user_id # Assign the user ID
    doc_id = create_document(COLLECTION_NAME, data)
    created_character_data = get_document(COLLECTION_NAME, doc_id)
    return Character(id=doc_id, **created_character_data)

def get_character(user_id: str, character_id: str) -> Optional[Character]:
    """
    Fetches a specific character by its ID, ensuring it belongs to the user.
    """
    character_data = get_document(COLLECTION_NAME, character_id)
    if character_data and character_data.get("user_id") == user_id:
        return Character(id=character_id, **character_data)
    return None # Character not found or does not belong to the user

def get_all_characters(user_id: str) -> List[Character]:
    """
    Fetches all characters owned by a specific user.
    """
    docs = firebase_db.collection(COLLECTION_NAME).where("user_id", "==", user_id).stream()
    characters = [Character(id=doc.id, **doc.to_dict()) for doc in docs]
    return characters

def update_character(user_id: str, character_id: str, update_data: CharacterUpdate) -> Optional[Character]:
    """
    Updates an existing character, ensuring it belongs to the user.
    """
    existing_character = get_character(user_id, character_id)
    if not existing_character:
        return None # Character not found or does not belong to the user

    update_dict = update_data.model_dump(exclude_unset=True)

    if not update_dict:
        return existing_character

    update_document(COLLECTION_NAME, character_id, update_dict)
    return get_character(user_id, character_id)

def delete_character(user_id: str, character_id: str) -> bool:
    """
    Deletes a character, ensuring it belongs to the user.
    Returns True if deleted, False otherwise.
    """
    existing_character = get_character(user_id, character_id)
    if not existing_character:
        return False # Character not found or does not belong to the user

    delete_document(COLLECTION_NAME, character_id)
    return True

