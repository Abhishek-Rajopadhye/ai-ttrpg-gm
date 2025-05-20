# routes/item.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.db.item import Item, ItemCreate
from app.services.item_service import (
    get_item,
    get_all_items_of_user,
    get_items_by_campaign,
    get_items_by_character,
    get_items_by_world,
    create_item,
    update_item,
    delete_item,
)

router = APIRouter()


@router.get("/items/{item_id}", response_model=Item)
def read_item(item_id: str):
    """
    Retrieve an item by its ID.

    Args:
        item_id (str): The ID of the item.

    Returns:
        Item: The item object.

    Raises:
        HTTPException: 
            404: If not found
            500: For other errors.
    """
    try:
        item = get_item(item_id)
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return item
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error retrieving item: {e}")


@router.get("/items/user/{user_id}", response_model=List[Item])
def read_items_by_user(user_id: str):
    """
    Retrieve all items for a specific user.

    Args:
        user_id (str): The user's ID.

    Returns:
        List[Item]: List of item objects.

    Raises:
        HTTPException:
            500: For other errors.
    """
    try:
        items = get_all_items_of_user(user_id)
        return items
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error retrieving items for user: {e}")


@router.get("/items/campaign/{campaign_id}", response_model=List[Item])
def read_items_by_campaign(campaign_id: str):
    """
    Retrieve all items for a specific campaign.

    Args:
        campaign_id (str): The campaign's ID.

    Returns:
        List[Item]: List of item objects.

    Raises:
        HTTPException:
            500: For other errors.
    """
    try:
        items = get_items_by_campaign(campaign_id)
        return items
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error retrieving items for campaign: {e}")


@router.get("/items/character/{character_id}", response_model=List[Item])
def read_items_by_character(character_id: str):
    """
    Retrieve all items for a specific character.

    Args:
        character_id (str): The character's ID.

    Returns:
        List[Item]: List of item objects.

    Raises:
        HTTPException:
            500: For other errors.
    """
    try:
        items = get_items_by_character(character_id)
        return items
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving items for character: {e}")


@router.get("/items/world/{world_id}", response_model=List[Item])
def read_items_by_world(world_id: str):
    """
    Retrieve all items for a specific world.

    Args:
        world_id (str): The world's ID.

    Returns:
        List[Item]: List of item objects.

    Raises:
        HTTPException:
            500: For other errors.
    """
    try:
        items = get_items_by_world(world_id)
        return items
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error retrieving items for world: {e}")


@router.post("/items/", response_model=str)
def create_item_route(item: ItemCreate):
    """
    Create a new item.

    Args:
        item (ItemCreate): The item data.

    Returns:
        str: The ID of the newly created item.
    
    Raises:
        HTTPException:
            500: For other errors.
    """
    try:
        item_id = create_item(item)
        return item_id
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error creating item: {e}")


@router.put("/items/{item_id}", response_model=Item)
def update_item_route(item_id: str, item: Item):
    """
    Update an existing item.

    Args:
        item_id (str): The ID of the item to update.
        item (Item): The updated item data.

    Returns:
        Item: The updated item object.

    Raises:
        HTTPException: 
            404: If not found
            500: For other errors.
    """
    try:
        updated_item = update_item(item_id, item)
        if updated_item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return updated_item
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error updating item: {e}")


@router.delete("/items/{item_id}")
def delete_item_route(item_id: str):
    """
    Delete an item by its ID.

    Args:
        item_id (str): The ID of the item to delete.

    Returns:
        dict: Message indicating deletion status.

    Raises:
        HTTPException: 
            404: If not found
            500: For other errors.
    """
    try:
        deleted = delete_item(item_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": "Item deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error deleting item: {e}")
