# routes/campaign.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.db.campaign import Campaign, CampaignCreate
from app.services.campaign_service import get_campaign, get_all_campaigns_of_user, create_campaign, update_campaign, delete_campaign
from app.services.character_service import get_character

router = APIRouter()


@router.get("/{campaign_id}", response_model=Campaign)
def read_campaign(campaign_id: str):
    """
    Retrieve a campaign by its ID.

    Args:
        campaign_id (str): The ID of the campaign.

    Returns:
        Campaign: The campaign object.

    Raises:
        HTTPException: 
            404 if not found
            500 for other errors
    """
    try:
        campaign = get_campaign(campaign_id)
        if campaign is None:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return campaign
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error retrieving campaign: {e}")


@router.get("/user/{user_id}", response_model=List[Campaign])
def read_campaigns_by_user(user_id: str):
    """
    Retrieve all campaigns for a specific user.

    Args:
        user_id (str): The user's ID.

    Returns:
        List[Campaign]: List of campaign objects.

    Raises:
        HTTPException: 
            500 for errors
    """
    try:
        campaigns = get_all_campaigns_of_user(user_id)
        return campaigns
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error retrieving campaigns for user: {e}")


@router.post("/", response_model=str)
def create_campaign(campaign: CampaignCreate):
    """
    Create a new campaign.

    Args:
        campaign (CampaignCreate): The campaign data.

    Returns:
        str: The ID of the newly created campaign.

    Raises:
        HTTPException: 
            500 for errors
    """
    try:
        campaign_id = create_campaign(campaign)
        return campaign_id
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error creating campaign: {e}")


@router.put("/{campaign_id}", response_model=Campaign)
def update_campaign(campaign_id: str, campaign: Campaign):
    """
    Update an existing campaign.

    Args:
        campaign_id (str): The ID of the campaign to update.
        campaign (Campaign): The updated campaign data.

    Returns:
        Campaign: The updated campaign object.

    Raises:
        HTTPException: 
            404 if not found
            500 for other errors
    """
    try:
        updated_campaign = update_campaign(campaign_id, campaign)
        if updated_campaign is None:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return updated_campaign
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error updating campaign: {e}")


@router.put("/{campaign_id}/characters/{character_id}")
def add_character_to_campaign(campaign_id: str, character_id: str):
    campaign = get_campaign(campaign_id)
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    character = get_character(character_id)
    if character is None:
        raise HTTPException(status_code=404, detail="Character not found")
    if character["type"] == "PC":
        campaign["player_character_ids"] = campaign.get(
            "player_character_ids", []) + [character_id]
    else:
        campaign["active_npc_character_ids"] = campaign.get(
            "active_npc_character_ids", []) + [character_id]
    update_campaign(campaign_id, Campaign(**campaign))
    return {"message": "Character added to campaign"}


@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: str):
    """
    Delete a campaign by its ID.

    Args:
        campaign_id (str): The ID of the campaign to delete.

    Returns:
        dict: Message indicating deletion status.

    Raises:
        HTTPException: 
            404 if not found
            500 for other errors
    """
    try:
        deleted = delete_campaign(campaign_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return {"message": "Campaign deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error deleting campaign: {e}")
