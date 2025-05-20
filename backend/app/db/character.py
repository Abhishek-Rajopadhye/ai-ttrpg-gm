# db/character.py
from pydantic import BaseModel
from typing import Optional, List


class CharacterBase(BaseModel):
    name: str
    type: str  # "PC" or "NPC"
    description: str
    backstory: Optional[str]
    race: str
    class_: str
    level: int
    xp: int
    alignment: str
    stats: dict
    skills: dict
    saving_throws: dict
    inventory: List[dict]
    equipment_slots: dict
    abilities: List[dict]
    spells: List[dict]
    status_effects: List[str]
    current_location_id: Optional[str]
    map_position: Optional[dict]
    ai_data: Optional[dict]
    campaign_id: Optional[str]


class CharacterCreate(CharacterBase):
    pass


class Character(CharacterBase):
    id: str

    class Config:
        from_attributes = True
