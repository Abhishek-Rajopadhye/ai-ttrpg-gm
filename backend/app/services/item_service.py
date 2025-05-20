# services/item_service.py
from typing import Optional, List
from app.db.item import Item, ItemCreate
from app.core.firebase import firebase_db
from google.cloud.exceptions import NotFound, GoogleCloudError

COLLECTION_NAME = "items"


def get_item(item_id: str) -> Optional[dict]:
    """
    Retrieve an item by its ID.

    Args:
        item_id (str): The ID of the item.

    Returns:
        dict or None: The item data as a dictionary if found, else None.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        item_ref = firebase_db.collection(COLLECTION_NAME).document(item_id)
        item_doc = item_ref.get()
        if item_doc.exists:
            return item_doc.to_dict()
        else:
            return None
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching item: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching item: {general_error}")


def get_all_items_of_user(user_id: str) -> List[Item]:
    """
    Fetch all items owned by a specific user.

    Args:
        user_id (str): The user's ID.

    Returns:
        List[Item]: List of Item objects.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        docs = firebase_db.collection(COLLECTION_NAME).where(
            "user_id", "==", user_id).get()
        items = [Item(id=doc.id, **doc.to_dict()) for doc in docs]
        return items
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching items for user: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching items for user: {general_error}")


def get_items_by_world(world_id: str) -> List[Item]:
    """
    Fetch all items associated with a specific world.

    Args:
        world_id (str): The ID of the world.

    Returns:
        List[Item]: List of Item objects.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        docs = firebase_db.collection(COLLECTION_NAME).where(
            "world_id", "==", world_id).get()
        items = [Item(id=doc.id, **doc.to_dict()) for doc in docs]
        return items
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching items for world: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching items for world: {general_error}"
        )


def get_items_by_campaign(campaign_id: str) -> List[Item]:
    """
    Fetch all items associated with a specific campaign.

    Args:
        campaign_id (str): The ID of the campaign.

    Returns:
        List[Item]: List of Item objects.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        docs = firebase_db.collection(COLLECTION_NAME).where(
            "campaign_id", "==", campaign_id).get()
        items = [Item(id=doc.id, **doc.to_dict()) for doc in docs]
        return items
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching items for campaign: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching items for campaign: {general_error}"
        )


def get_items_by_character(character_id: str) -> List[Item]:
    """
    Fetch all items associated with a specific character.

    Args:
        character_id (str): The ID of the character.

    Returns:
        List[Item]: List of Item objects.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error..
    """
    try:
        docs = firebase_db.collection(COLLECTION_NAME).where(
            "character_id", "==", character_id).get()
        items = [Item(id=doc.id, **doc.to_dict()) for doc in docs]
        return items
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching items for character: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching items for character: {general_error}"
        )


def create_item(item: ItemCreate) -> str:
    """
    Create a new item.

    Args:
        item (ItemCreate): The item data.

    Returns:
        str: The ID of the newly created item.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        item_data = item.dict()
        item_ref = firebase_db.collection(COLLECTION_NAME).document()
        item_ref.set(item_data)
        return item_ref.id
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while creating item: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while creating item: {general_error}")


def update_item(item_id: str, item: Item) -> Optional[dict]:
    """
    Update an existing item.

    Args:
        item_id (str): The ID of the item to update.
        item (Item): The updated item data.

    Returns:
        dict or None: The updated item data as a dictionary if successful, else None.

    Raises:
        NotFound: If the item does not exist.
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        item_ref = firebase_db.collection(COLLECTION_NAME).document(item_id)
        item_data = item.model_dump(exclude={"id"})
        item_ref.update(item_data)
        updated_doc = item_ref.get()
        if updated_doc.exists:
            return updated_doc.to_dict()
        else:
            return None
    except NotFound as not_found_error:
        raise NotFound(f"Item not found: {not_found_error}")
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while updating item: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while updating item: {general_error}")


def delete_item(item_id: str) -> bool:
    """
    Delete an item by its ID.

    Args:
        item_id (str): The ID of the item to delete.

    Returns:
        bool: True if deletion was successful.

    Raises:
        NotFound: If the item does not exist.
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        item_ref = firebase_db.collection(COLLECTION_NAME).document(item_id)
        item_ref.delete()
        return True
    except NotFound as not_found_error:
        raise NotFound(f"Item not found: {not_found_error}")
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while deleting item: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while deleting item: {general_error}")
