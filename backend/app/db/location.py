# db/location.py
from pydantic import BaseModel
from typing import Optional, List


class LocationBase(BaseModel):
    world_id: str
    name: str
    description: str
    gm_notes: Optional[str]
    exits: Optional[dict]
    contained_item_refs: Optional[List[dict]]
    default_npc_refs: Optional[List[str]]


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    id: str

    class Config:
        orm_mode = True
