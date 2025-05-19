# routes/campaigns.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.campaign import Campaign, CampaignCreate, CampaignUpdate
from app.services import campaign_service, auth_service # Assuming services directory is accessible
# from dependencies import get_current_user_id # Import your actual dependency

router = APIRouter()


@router.post("/", response_model=Campaign, status_code=status.HTTP_201_CREATED)
def create_campaign_route(
    campaign_data: CampaignCreate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Creates a new campaign for the authenticated user.
    """
    return campaign_service.create_campaign(user_id, campaign_data)

@router.get("/", response_model=List[Campaign])
def get_all_campaigns_route(
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves all campaigns owned by the authenticated user.
    """
    return campaign_service.get_all_campaigns(user_id)

@router.get("/{campaign_id}", response_model=Campaign)
def get_campaign_route(
    campaign_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Retrieves a specific campaign by its ID, ensuring it belongs to the user.
    """
    campaign = campaign_service.get_campaign(user_id, campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found or you do not have access")
    return campaign

@router.put("/{campaign_id}", response_model=Campaign)
def update_campaign_route(
    campaign_id: str,
    update_data: CampaignUpdate,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Updates an existing campaign, ensuring it belongs to the user.
    """
    updated_campaign = campaign_service.update_campaign(user_id, campaign_id, update_data)
    if updated_campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found or you do not have access")
    return updated_campaign

@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_campaign_route(
    campaign_id: str,
    user_id: str = Depends(auth_service.get_current_user_id)
):
    """
    Deletes a campaign, ensuring it belongs to the user.
    """
    success = campaign_service.delete_campaign(user_id, campaign_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found or you do not have access")
    return {"detail": "Campaign deleted successfully"}

