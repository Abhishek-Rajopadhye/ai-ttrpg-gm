# routes/world.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.db.world import World, WorldCreate
from app.services.world_service import (
    get_world,
    get_all_worlds_of_user,
    create_world,
    update_world,
    delete_world,
)
from app.services.item_service import get_item

router = APIRouter()


@router.get("/{world_id}", response_model=World)
def read_world(world_id: str):
    """
    Retrieve a world by its ID.

    Args:
        world_id (str): The ID of the world.

    Returns:
        World: The world object.

    Raises:
        HTTPException: 
            404: If not found
            500: For other errors.
    """
    try:
        world = get_world(world_id)
        if world is None:
            raise HTTPException(status_code=404, detail="World not found")
        return world
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving world: {e}")


@router.get("/user/{user_id}", response_model=List[World])
def read_worlds_by_user(user_id: str):
    """
    Retrieve all worlds for a specific user.

    Args:
        user_id (str): The user's ID.

    Returns:
        List[World]: List of world objects.

    Raises:
        HTTPException:
            500: For errors.
    """
    try:
        worlds = get_all_worlds_of_user(user_id)
        return worlds
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving worlds for user: {e}")


@router.post("/", response_model=str)
def create_world_route(world: WorldCreate):
    """
    Create a new world.

    Args:
        world (WorldCreate): The world data.

    Returns:
        str: The ID of the newly created world.

    Raises:
        HTTPException:
            500: For errors.
    """
    try:
        world_id = create_world(world)
        return world_id
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error creating world: {e}")


@router.put("/{world_id}", response_model=World)
def update_world_route(world_id: str, world: World):
    """
    Update an existing world.

    Args:
        world_id (str): The ID of the world to update.
        world (World): The updated world data.

    Returns:
        World: The updated world object.

    Raises:
        HTTPException: 
            404: If not found
            500: For other errors.
    """
    try:
        updated_world = update_world(world_id, world)
        if updated_world is None:
            raise HTTPException(status_code=404, detail="World not found")
        return updated_world
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error updating world: {e}")


@router.put("/worlds/{world_id}/items/{item_id}")
def add_item_to_world(world_id: str, item_id: str):
    world = get_world(world_id)
    if world is None:
        raise HTTPException(status_code=404, detail="World not found")
    item = get_item(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    world["item_ids"] = world.get("item_ids", []) + [item_id]
    update_world(world_id, World(**world))
    return {"message": "Item added to world"}

@router.delete("/{world_id}")
def delete_world_route(world_id: str):
    """
    Delete a world by its ID.

    Args:
        world_id (str): The ID of the world to delete.

    Returns:
        dict: Message indicating deletion status.

    Raises:
        HTTPException: 
            404: If not found
            500: For other errors.
    """
    try:
        deleted = delete_world(world_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="World not found")
        return {"message": "World deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error deleting world: {e}")
