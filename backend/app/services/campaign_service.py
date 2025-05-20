# services/campaign_service.py
from typing import List, Optional
from app.db.campaign import Campaign, CampaignCreate
from app.core.firebase import firebase_db
from datetime import datetime, timezone
from google.cloud.exceptions import NotFound, GoogleCloudError

COLLECTION_NAME = "campaigns"


def get_campaign(campaign_id: str) -> Optional[dict]:
    """
    Retrieve a campaign by its ID.

    Args:
        campaign_id (str): The ID of the campaign.

    Returns:
        dict or None: The campaign data as a dictionary if found, else None.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error. 
    """
    try:
        campaign_ref = firebase_db.collection(COLLECTION_NAME).document(
            campaign_id)
        campaign_doc = campaign_ref.get()
        if campaign_doc.exists:
            return campaign_doc.to_dict()
        else:
            return None
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching campaign: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching campaign: {general_error}")


def get_all_campaigns_of_user(user_id: str) -> List[Campaign]:
    """
    Fetch all campaigns owned by a specific user.

    Args:
        user_id (str): The user's ID.

    Returns:
        List[Campaign]: List of Campaign objects.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        docs = firebase_db.collection(COLLECTION_NAME).where(
            "user_id", "==", user_id).get()
        campaigns = [Campaign(id=doc.id, **doc.to_dict()) for doc in docs]
        return campaigns
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while fetching campaigns for user: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while fetching campaigns for user: {general_error}"
        )


def create_campaign(campaign: CampaignCreate) -> str:
    """
    Create a new campaign.

    Args:
        campaign (CampaignCreate): The campaign data.

    Returns:
        str: The ID of the newly created campaign.

    Raises:
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.    
    """
    try:
        campaign_data = campaign.model_dump()
        campaign_data["created_at"] = datetime.now(timezone.utc)
        campaign_data["last_played_at"] = datetime.now(timezone.utc)
        campaign_data["player_character_ids"] = []
        campaign_data["active_npc_character_ids"] = []
        campaign_ref = firebase_db.collection(COLLECTION_NAME).document()
        campaign_ref.set(campaign_data)
        return campaign_ref.id
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while creating campaign: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while creating campaign: {general_error}")


def update_campaign(campaign_id: str, campaign: Campaign) -> Optional[dict]:
    """
    Update an existing campaign.

    Args:
        campaign_id (str): The ID of the campaign to update.
        campaign (Campaign): The updated campaign data.

    Returns:
        dict or None: The updated campaign data as a dictionary if successful, else None.

    Raises:
        NotFound: If the campaign does not exist.
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        campaign_ref = firebase_db.collection(COLLECTION_NAME).document(
            campaign_id)
        campaign_data = campaign.model_dump(exclude={"id"})
        campaign_ref.update(campaign_data)
        updated_doc = campaign_ref.get()
        if updated_doc.exists:
            return updated_doc.to_dict()
        else:
            return None
    except NotFound as not_found_error:
        raise NotFound(f"Campaign not found: {not_found_error}")
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while updating campaign: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while updating campaign: {general_error}")


def delete_campaign(campaign_id: str) -> bool:
    """
    Delete a campaign by its ID.

    Args:
        campaign_id (str): The ID of the campaign to delete.

    Returns:
        bool: True if deletion was successful.

    Raises:
        NotFound: If the campaign does not exist.
        GoogleCloudError: If there is a database error.
        Exception: If there is a general error.
    """
    try:
        campaign_ref = firebase_db.collection(COLLECTION_NAME).document(
            campaign_id)
        campaign_ref.delete()
        return True
    except NotFound as not_found_error:
        raise NotFound(f"Campaign not found: {not_found_error}")
    except GoogleCloudError as db_error:
        raise GoogleCloudError(
            f"Database error while deleting campaign: {db_error}")
    except Exception as general_error:
        raise Exception(
            f"Unexpected error while deleting campaign: {general_error}")
