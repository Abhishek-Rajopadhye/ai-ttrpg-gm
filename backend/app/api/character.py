# routes/character.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.character import Character, CharacterCreate, CharacterUpdate
from app.services import character_service, auth_service # Assuming services directory is accessible
# from dependencies import get_current_user_id # Import your actual dependency

router = APIRouter()


@router.post("/", response_model=Character, status_code=status.HTTP_201_CREATED)
def create_character_route(
    character_data: CharacterCreate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Creates a new character for the authenticated user.
    """
    return character_service.create_character(user_id, character_data)

@router.get("/", response_model=List[Character])
def get_all_characters_route(
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves all characters owned by the authenticated user.
    """
    return character_service.get_all_characters(user_id)

@router.get("/{character_id}", response_model=Character)
def get_character_route(
    character_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves a specific character by its ID, ensuring it belongs to the user.
    """
    character = character_service.get_character(user_id, character_id)
    if character is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Character not found or you do not have access")
    return character

@router.put("/{character_id}", response_model=Character)
def update_character_route(
    character_id: str,
    update_data: CharacterUpdate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Updates an existing character, ensuring it belongs to the user.
    """
    updated_character = character_service.update_character(user_id, character_id, update_data)
    if updated_character is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Character not found or you do not have access")
    return updated_character

@router.delete("/{character_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_character_route(
    character_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Deletes a character, ensuring it belongs to the user.
    """
    success = character_service.delete_character(user_id, character_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Character not found or you do not have access")
    return {"detail": "Character deleted successfully"}

