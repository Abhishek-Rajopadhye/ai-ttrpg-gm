# db/campaign.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CampaignBase(BaseModel):
    name: str
    description: str
    created_by_user_id: Optional[str]
    ruleset: str
    game_state: dict


class CampaignCreate(CampaignBase):
    pass


class Campaign(CampaignBase):
    id: str
    created_at: datetime
    last_played_at: datetime
    player_character_ids: List[str]
    active_npc_character_ids: List[str]
    world_definition_id: Optional[str]

    class Config:
        from_attributes = True


class GameState(BaseModel):
    current_location_id: str
    current_scene_description: str
    time_of_day: str
    weather: str
    party_location_notes: str
    campaign_variables: dict
    in_combat: bool
    combat_state: Optional[dict]


class CombatState(BaseModel):
    turn_order: List[str]
    current_turn_index: int
    round_number: int
    active_effects: List[dict]
