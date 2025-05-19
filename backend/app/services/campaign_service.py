# services/campaign_service.py
from typing import Optional, List
from app.db.campaign import Campaign, CampaignCreate, CampaignUpdate
from app.core.firebase import firebase_db, get_document, create_document, update_document, delete_document

COLLECTION_NAME = "campaigns"

def create_campaign(user_id: str, campaign_data: CampaignCreate) -> Campaign:
    """
    Creates a new campaign for a specific user in Firestore.
    """
    data = campaign_data.model_dump()
    data["user_id"] = user_id # Assign the user ID
    doc_id = create_document(COLLECTION_NAME, data)
    created_campaign_data = get_document(COLLECTION_NAME, doc_id)
    return Campaign(id=doc_id, **created_campaign_data)

def get_campaign(user_id: str, campaign_id: str) -> Optional[Campaign]:
    """
    Fetches a specific campaign by its ID, ensuring it belongs to the user.
    """
    campaign_data = get_document(COLLECTION_NAME, campaign_id)
    if campaign_data and campaign_data.get("user_id") == user_id:
        return Campaign(id=campaign_id, **campaign_data)
    return None # Campaign not found or does not belong to the user

def get_all_campaigns(user_id: str) -> List[Campaign]:
    """
    Fetches all campaigns owned by a specific user.
    """
    docs = firebase_db.collection(COLLECTION_NAME).where("user_id", "==", user_id).stream()
    campaigns = [Campaign(id=doc.id, **doc.to_dict()) for doc in docs]
    return campaigns

def update_campaign(user_id: str, campaign_id: str, update_data: CampaignUpdate) -> Optional[Campaign]:
    """
    Updates an existing campaign, ensuring it belongs to the user.
    """
    existing_campaign = get_campaign(user_id, campaign_id)
    if not existing_campaign:
        return None # Campaign not found or does not belong to the user

    update_dict = update_data.model_dump(exclude_unset=True)

    if not update_dict:
        return existing_campaign

    update_document(COLLECTION_NAME, campaign_id, update_dict)
    return get_campaign(user_id, campaign_id)

def delete_campaign(user_id: str, campaign_id: str) -> bool:
    """
    Deletes a campaign, ensuring it belongs to the user.
    Returns True if deleted, False otherwise.
    """
    existing_campaign = get_campaign(user_id, campaign_id)
    if not existing_campaign:
        return False # Campaign not found or does not belong to the user

    delete_document(COLLECTION_NAME, campaign_id)
    return True

