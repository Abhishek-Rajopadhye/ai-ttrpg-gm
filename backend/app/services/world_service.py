# services/world_service.py
from typing import Optional, List
from app.db.world import World, WorldCreate, WorldUpdate
from app.core.firebase import firebase_db, get_document, get_user_documents, create_document, update_document, delete_document

COLLECTION_NAME = "worlds"


def create_world(user_id: str, world_data: WorldCreate) -> World:
    """
    Creates a new world for a specific user in Firestore.
    """
    data = world_data.model_dump()
    data["user_id"] = user_id  # Assign the user ID
    doc_id = create_document(COLLECTION_NAME, data)
    # Fetch the newly created document to return the full World model with ID
    created_world_data = get_document(COLLECTION_NAME, doc_id)
    return World(id=doc_id, **created_world_data)


def get_world(user_id: str, world_id: str) -> Optional[World]:
    """
    Fetches a specific world by its ID, ensuring it belongs to the user.
    """
    world_data = get_document(COLLECTION_NAME, world_id)
    if world_data and world_data.get("user_id") == user_id:
        return World(id=world_id, **world_data)
    return None  # World not found or does not belong to the user


def get_all_worlds(user_id: str) -> List[World]:
    """
    Fetches all worlds owned by a specific user.
    """
    world_docs = get_user_documents(COLLECTION_NAME, user_id)
    # Convert Firestore documents (dicts) to Pydantic models
    # Need to include the document ID in the data
    worlds = []
    for doc_data in world_docs:
        # Firestore helper methods should ideally include the doc ID
        # Let's adjust get_user_documents or assume it returns dicts with ID
        # For now, assume the helper returns dicts without ID and requires manual addition
        # A better helper would return a list of {'id': doc.id, **doc.to_dict()}
        # For this example, let's assume doc_data already includes 'id' if using an improved helper
        # If not, you'd need to fetch again or modify the helper.
        # Let's simulate adding ID if it's missing based on a hypothetical helper update
        if 'id' not in doc_data:
            # This part depends heavily on the actual helper implementation
            # A robust helper would return ID. Assuming for now data includes ID.
            pass  # Placeholder, ideally doc_data has 'id'

        # If your helper doesn't return ID, you'd need to fetch individually or adjust helper
        # Example if helper returns list of dicts without ID:
        # doc_ref = db.collection(COLLECTION_NAME).where("user_id", "==", user_id).stream()
        # worlds = [World(id=doc.id, **doc.to_dict()) for doc in doc_ref]
        # Let's use the simplified helper for now and assume it works as intended
        # Assuming doc_data includes 'id' from helper
        worlds.append(World(**doc_data))

    # Correction: The `get_user_documents` helper returns a list of dicts from `to_dict()`.
    # We need the document ID to create the Pydantic model.
    # Let's refine the fetching logic here or improve the helper.
    # A better way using the stream directly:
    docs = firebase_db.collection(COLLECTION_NAME).where(
        "user_id", "==", user_id).stream()
    worlds = [World(id=doc.id, **doc.to_dict()) for doc in docs]

    return worlds


def update_world(user_id: str, world_id: str, update_data: WorldUpdate) -> Optional[World]:
    """
    Updates an existing world, ensuring it belongs to the user.
    """
    # First, verify the world exists and belongs to the user
    existing_world = get_world(user_id, world_id)
    if not existing_world:
        return None  # World not found or does not belong to the user

    # Convert Pydantic model to dictionary, excluding unset fields
    update_dict = update_data.model_dump(exclude_unset=True)

    if not update_dict:
        # No fields to update, return the existing world
        return existing_world

    update_document(COLLECTION_NAME, world_id, update_dict)

    # Fetch and return the updated world object
    return get_world(user_id, world_id)


def delete_world(user_id: str, world_id: str) -> bool:
    """
    Deletes a world, ensuring it belongs to the user.
    Returns True if deleted, False otherwise.
    """
    # First, verify the world exists and belongs to the user
    existing_world = get_world(user_id, world_id)
    if not existing_world:
        return False  # World not found or does not belong to the user

    delete_document(COLLECTION_NAME, world_id)
    return True
