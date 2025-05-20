# services/location.py
from typing import Optional, List
from app.db.location import Location, LocationCreate
from app.core.firebase import firebase_db
from google.cloud.exceptions import NotFound, GoogleCloudError

COLLECTION_NAME = "locations"


def get_location(location_id: str):
    location_ref = firebase_db.collection(COLLECTION_NAME).document(
        location_id)
    location_doc = location_ref.get()
    if location_doc.exists:
        return location_doc.to_dict()
    else:
        return None


def get_locations_in_world(world_id: str):
    locations_ref = firebase_db.collection(COLLECTION_NAME).where(
        "world_id", "==", world_id)
    locations_docs = locations_ref.stream()
    return [location_doc.to_dict() for location_doc in locations_docs]


def get_location_of_character(character_id: str):
    character_ref = firebase_db.collection("characters").document(character_id)
    character_doc = character_ref.get()
    if character_doc.exists:
        return character_doc.get("current_location_id")
    else:
        return None


def get_locations_by_user(user_id: str):
    # Assuming locations are not directly associated with users
    # Instead, get characters of the user and then their locations
    characters_ref = firebase_db.collection("characters").where(
        "created_by_user_id", "==", user_id)
    characters_docs = characters_ref.stream()
    locations = []
    for character_doc in characters_docs:
        character = character_doc.to_dict()
        location_id = character.get("current_location_id")
        if location_id:
            location_ref = firebase_db.collection(COLLECTION_NAME).document(
                location_id)
            location_doc = location_ref.get()
            if location_doc.exists:
                locations.append(location_doc.to_dict())
    return locations


def get_locations_in_campaign(campaign_id: str):
    # Get characters in the campaign and then their locations
    campaign_ref = firebase_db.collection("campaigns").document(campaign_id)
    campaign_doc = campaign_ref.get()
    if campaign_doc.exists:
        campaign = campaign_doc.to_dict()
        player_character_ids = campaign.get("player_character_ids", [])
        active_npc_character_ids = campaign.get("active_npc_character_ids", [])
        character_ids = player_character_ids + active_npc_character_ids
        locations = []
        for character_id in character_ids:
            character_ref = firebase_db.collection("characters").document(
                character_id)
            character_doc = character_ref.get()
            if character_doc.exists:
                character = character_doc.to_dict()
                location_id = character.get("current_location_id")
                if location_id:
                    location_ref = firebase_db.collection(
                        COLLECTION_NAME).document(location_id)
                    location_doc = location_ref.get()
                    if location_doc.exists:
                        locations.append(location_doc.to_dict())
        return locations
    else:
        return None


def create_location(location: LocationCreate):
    location_data = location.dict()
    location_ref = firebase_db.collection(COLLECTION_NAME).document()
    location_ref.set(location_data)
    return location_ref.id


def update_location(location_id: str, location: Location):
    location_ref = firebase_db.collection(COLLECTION_NAME).document(
        location_id)
    location_data = location.dict(exclude={"id"})
    location_ref.update(location_data)
    return location_ref.get().to_dict()


def delete_location(location_id: str):
    location_ref = firebase_db.collection(COLLECTION_NAME).document(
        location_id)
    location_ref.delete()
    return True
