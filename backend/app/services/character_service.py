# services/character_service.py
from typing import Optional, List
from app.db.character import Character, CharacterCreate
from app.core.firebase import firebase_db

COLLECTION_NAME = "characters"


def get_character(character_id: str):
    character_ref = firebase_db.collection(COLLECTION_NAME).document(
        character_id)
    character_doc = character_ref.get()
    if character_doc.exists:
        return character_doc.to_dict()
    else:
        return None


def get_characters_of_user(user_id: str):
    characters_ref = firebase_db.collection(COLLECTION_NAME).where(
        "created_by_user_id", "==", user_id)
    characters_docs = characters_ref.stream()
    return [character_doc.to_dict() for character_doc in characters_docs]


def get_characters_in_world(world_id: str):
    characters_ref = firebase_db.collection(COLLECTION_NAME).where(
        "world_id", "==", world_id)
    characters_docs = characters_ref.stream()
    return [character_doc.to_dict() for character_doc in characters_docs]


def get_characters_at_location(location_id: str):
    characters_ref = firebase_db.collection(COLLECTION_NAME).where(
        "current_location_id", "==", location_id)
    characters_docs = characters_ref.stream()
    return [character_doc.to_dict() for character_doc in characters_docs]


def get_characters_in_campaign(campaign_id: str):
    campaign_ref = firebase_db.collection(COLLECTION_NAME).document(
        campaign_id)
    campaign_doc = campaign_ref.get()
    if campaign_doc.exists:
        campaign = campaign_doc.to_dict()
        player_character_ids = campaign.get("player_character_ids", [])
        active_npc_character_ids = campaign.get("active_npc_character_ids", [])

        characters = []
        for character_id in player_character_ids + active_npc_character_ids:
            character = get_character(character_id)
            if character:
                characters.append(character)

        return characters
    else:
        return None


def create_character(character: CharacterCreate):
    character_data = character.model_dump()
    character_ref = firebase_db.collection(COLLECTION_NAME).document()
    character_ref.set(character_data)
    return character_ref.id


def update_character(character_id: str, character: Character):
    character_ref = firebase_db.collection(COLLECTION_NAME).document(
        character_id)
    character_data = character.model_dump(exclude={"id"})
    character_ref.update(character_data)
    return character_ref.get().to_dict()


def delete_character(character_id: str):
    character_ref = firebase_db.collection(COLLECTION_NAME).document(
        character_id)
    character_ref.delete()
    return True
