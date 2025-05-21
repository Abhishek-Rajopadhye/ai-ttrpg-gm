from typing import Optional, List
from app.db.world import WorldCreate, World, WorldUpdate, Area, POI
from app.core.firebase import firebase_db
from datetime import datetime, timezone
from google.cloud.exceptions import NotFound, GoogleCloudError

COLLECTION_NAME = "worlds"

import base64

def save_image_from_base64(base64_str, filename):
    with open(filename, "wb") as f:
        f.write(base64.b64decode(base64_str))

def get_world(world_id: str) -> Optional[dict]:
    """
    Retrieve a world by its ID.

    Args:
        world_id (str): The ID of the world.

    Returns:
        dict or None: The world data as a dictionary if found, else None.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        world_ref = firebase_db.collection(COLLECTION_NAME).document(world_id)
        world_doc = world_ref.get()
        if world_doc.exists:
            return world_doc.to_dict()
        else:
            return None
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching world: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching world: {general_error}")

def get_all_worlds_of_user(user_id: str) -> List[dict]:
    """
    Fetch all worlds owned by a specific user.

    Args:
        user_id (str): The user's ID.

    Returns:
        List[dict]: List of world data as dictionaries.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        docs = firebase_db.collection(COLLECTION_NAME).where(
            "by_user", "==", user_id).get()
        worlds = [doc.to_dict() for doc in docs]
        return worlds
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching worlds for user: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching worlds for user: {general_error}"
        )

def create_world(world: WorldCreate) -> str:
    """
    Create a new world.

    Args:
        world (WorldCreate): The world data.

    Returns:
        str: The ID of the newly created world.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        world_data = world.model_dump()
        world_data["created_at"] = datetime.now(timezone.utc)
        # Ensure nested models are dicts
        world_data["areas"] = [area.model_dump() for area in world.areas] if world.areas else []
        world_data["pois"] = [poi.model_dump() for poi in world.pois] if world.pois else []
        world_ref = firebase_db.collection(COLLECTION_NAME).document()
        world_ref.set(world_data)
        return world_ref.id
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while creating world: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while creating world: {general_error}")

def update_world(world_id: str, world_update: WorldUpdate) -> Optional[dict]:
    """
    Update an existing world.

    Args:
        world_id (str): The ID of the world to update.
        world_update (WorldUpdate): The updated world data.

    Returns:
        dict or None: The updated world data as a dictionary if successful, else None.

    Raises:
        NotFound: If the world does not exist.
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        world_ref = firebase_db.collection(COLLECTION_NAME).document(world_id)
        update_data = world_update.dict(exclude_unset=True)
        # Convert nested models to dicts if present
        if "areas" in update_data and update_data["areas"] is not None:
            update_data["areas"] = [area.dict() for area in update_data["areas"]]
        if "pois" in update_data and update_data["pois"] is not None:
            update_data["pois"] = [poi.dict() for poi in update_data["pois"]]
        world_ref.update(update_data)
        updated_doc = world_ref.get()
        if updated_doc.exists:
            return updated_doc.to_dict()
        else:
            return None
    except NotFound as not_found_error:
        raise NotFound(f"World not found: {not_found_error}")
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while updating world: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while updating world: {general_error}")

def delete_world(world_id: str) -> bool:
    """
    Delete a world by its ID.

    Args:
        world_id (str): The ID of the world to delete.

    Returns:
        bool: True if deletion was successful.

    Raises:
        NotFound: If the world does not exist.
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        world_ref = firebase_db.collection(COLLECTION_NAME).document(world_id)
        world_ref.delete()
        return True
    except NotFound as not_found_error:
        raise NotFound(f"World not found: {not_found_error}")
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while deleting world: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while deleting world: {general_error}")