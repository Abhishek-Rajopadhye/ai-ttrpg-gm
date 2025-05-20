# db/world.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class WorldBase(BaseModel):
    name: str
    description: str
    ruleset_id: str
    item_ids: Optional[List[str]]
    ability_ids: Optional[List[str]]
    location_ids: Optional[List[str]]
    spell_ids: Optional[List[str]]


class WorldCreate(WorldBase):
    pass


class World(WorldBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True
