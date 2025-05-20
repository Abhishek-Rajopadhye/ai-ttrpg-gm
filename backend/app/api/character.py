# routes/character.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.character import Character, CharacterCreate
from app.services.character_service import get_character, get_characters_in_campaign, get_characters_in_world, get_characters_at_location, get_characters_of_user, create_character, update_character, delete_character

router = APIRouter()


@router.get("/{character_id}", response_model=Character)
def read_character(character_id: str):
    character = get_character(character_id)
    if character is None:
        raise HTTPException(status_code=404, detail="Character not found")
    return character


@router.get("/users/{user_id}/characters")
def get_characters_of_user(user_id: str):
    characters = get_characters_of_user(user_id)
    return characters


@router.get("/worlds/{world_id}/characters")
def get_characters_in_world(world_id: str):
    characters = get_characters_in_world(world_id)
    return characters


@router.get("/locations/{location_id}/characters")
def get_characters_at_location(location_id: str):
    characters = get_characters_at_location(location_id)
    return characters


@router.get("/campaigns/{campaign_id}/characters")
def get_characters_in_campaign(campaign_id: str):
    characters = get_characters_in_campaign(campaign_id)
    if characters is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return characters


@router.post("/", response_model=str)
def create_character(character: CharacterCreate):
    character_id = create_character(character)
    return character_id


@router.put("/{character_id}", response_model=Character)
def update_character(character_id: str, character: Character):
    updated_character = update_character(character_id, character)
    if updated_character is None:
        raise HTTPException(status_code=404, detail="Character not found")
    return updated_character


@router.delete("/{character_id}")
def delete_character(character_id: str):
    deleted = delete_character(character_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Character not found")
    return {"message": "Character deleted"}
