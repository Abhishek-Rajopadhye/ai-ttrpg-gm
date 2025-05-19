# routes/worlds.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.world import World, WorldCreate, WorldUpdate
from app.services import world_service, auth_service  # Assuming services directory is accessible

# Assuming you have a dependency to get the current user ID from Firebase Auth
# from dependencies import get_current_user_id

router = APIRouter()

# Placeholder dependency for getting current user ID
# Replace with your actual Firebase Auth integration

# Import or define firebase_auth here


@router.post("/", response_model=World, status_code=status.HTTP_201_CREATED)
def create_world_route(
    world_data: WorldCreate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Creates a new world for the authenticated user.
    """
    return world_service.create_world(user_id, world_data)


@router.get("/", response_model=List[World])
def get_all_worlds_route(
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves all worlds owned by the authenticated user.
    """
    return world_service.get_all_worlds(user_id)


@router.get("/{world_id}", response_model=World)
def get_world_route(
    world_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves a specific world by its ID, ensuring it belongs to the user.
    """
    world = world_service.get_world(user_id, world_id)
    if world is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="World not found or you do not have access")
    return world


@router.put("/{world_id}", response_model=World)
def update_world_route(
    world_id: str,
    update_data: WorldUpdate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Updates an existing world, ensuring it belongs to the user.
    """
    updated_world = world_service.update_world(user_id, world_id, update_data)
    if updated_world is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="World not found or you do not have access")
    return updated_world


@router.delete("/{world_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_world_route(
    world_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Deletes a world, ensuring it belongs to the user.
    """
    success = world_service.delete_world(user_id, world_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="World not found or you do not have access")
    return {"detail": "World deleted successfully"}
