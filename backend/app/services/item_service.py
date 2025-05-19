# services/item_service.py
from typing import Optional, List
from app.db.item import Item, ItemCreate, ItemUpdate
from app.core.firebase import firebase_db, get_document, get_user_documents, create_document, update_document, delete_document

COLLECTION_NAME = "items"

def create_item(user_id: str, item_data: ItemCreate) -> Item:
    """
    Creates a new item for a specific user in Firestore.
    """
    data = item_data.model_dump()
    data["user_id"] = user_id # Assign the user ID
    doc_id = create_document(COLLECTION_NAME, data)
    created_item_data = get_document(COLLECTION_NAME, doc_id)
    return Item(id=doc_id, **created_item_data)

def get_item(user_id: str, item_id: str) -> Optional[Item]:
    """
    Fetches a specific item by its ID, ensuring it belongs to the user.
    """
    item_data = get_document(COLLECTION_NAME, item_id)
    if item_data and item_data.get("user_id") == user_id:
        return Item(id=item_id, **item_data)
    return None # Item not found or does not belong to the user

def get_all_items(user_id: str) -> List[Item]:
    """
    Fetches all items owned by a specific user.
    """
    docs = firebase_db.collection(COLLECTION_NAME).where("user_id", "==", user_id).stream()
    items = [Item(id=doc.id, **doc.to_dict()) for doc in docs]
    return items

def update_item(user_id: str, item_id: str, update_data: ItemUpdate) -> Optional[Item]:
    """
    Updates an existing item, ensuring it belongs to the user.
    """
    existing_item = get_item(user_id, item_id)
    if not existing_item:
        return None # Item not found or does not belong to the user

    update_dict = update_data.model_dump(exclude_unset=True)

    if not update_dict:
        return existing_item

    update_document(COLLECTION_NAME, item_id, update_dict)
    return get_item(user_id, item_id)

def delete_item(user_id: str, item_id: str) -> bool:
    """
    Deletes an item, ensuring it belongs to the user.
    Returns True if deleted, False otherwise.
    """
    existing_item = get_item(user_id, item_id)
    if not existing_item:
        return False # Item not found or does not belong to the user

    delete_document(COLLECTION_NAME, item_id)
    return True

