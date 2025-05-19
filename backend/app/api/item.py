# routes/items.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.item import Item, ItemCreate, ItemUpdate
from app.services import item_service, auth_service # Assuming services directory is accessible
# from dependencies import get_current_user_id # Import your actual dependency

router = APIRouter()

@router.post("/", response_model=Item, status_code=status.HTTP_201_CREATED)
def create_item_route(
    item_data: ItemCreate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Creates a new item for the authenticated user.
    """
    return item_service.create_item(user_id, item_data)

@router.get("/", response_model=List[Item])
def get_all_items_route(
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves all items owned by the authenticated user.
    """
    return item_service.get_all_items(user_id)

@router.get("/{item_id}", response_model=Item)
def get_item_route(
    item_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves a specific item by its ID, ensuring it belongs to the user.
    """
    item = item_service.get_item(user_id, item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found or you do not have access")
    return item

@router.put("/{item_id}", response_model=Item)
def update_item_route(
    item_id: str,
    update_data: ItemUpdate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Updates an existing item, ensuring it belongs to the user.
    """
    updated_item = item_service.update_item(user_id, item_id, update_data)
    if updated_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found or you do not have access")
    return updated_item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item_route(
    item_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Deletes an item, ensuring it belongs to the user.
    """
    success = item_service.delete_item(user_id, item_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found or you do not have access")
    return {"detail": "Item deleted successfully"}

