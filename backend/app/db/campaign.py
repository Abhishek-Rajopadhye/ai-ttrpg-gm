# db/campaign.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timezone
from app.db.world import World
from app.db.character import Character

class CampaignEvent(BaseModel):
    timestamp: datetime
    event_type: str  # e.g. "player_action", "npc_interaction", "quest_completion"
    description: str
    character_id: Optional[str]  # ID of the character involved in the event
    world_id: Optional[str]  # ID of the world where the event occurred

class CampaignBase(BaseModel):
    name: str
    worlds: List[World]
    characters: List[Character]
    created_at: datetime
    updated_at: datetime
    history: List[CampaignEvent]
    by_user: str


class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    name: Optional[str]
    worlds: Optional[List[World]]
    characters: Optional[List[Character]]
    updated_at: Optional[datetime] = datetime.now(timezone.utc)
    history: Optional[List[CampaignEvent]]

class Campaign(CampaignBase):
    id: str
    pass