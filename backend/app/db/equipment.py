# db/equipment.py
from pydantic import BaseModel
from typing import List
from enum import Enum
from app.db.attribute import Attribute

class Equipment(BaseModel):
    id: str
    name: str
    description: str
    type: str
    attribute_bonuses: List[Attribute]


class EquipmentSlot(str, Enum):
    head = "head"
    chest = "chest"
    hands = "hands"
    feet = "feet"
    # Add more equipment slots as needed

class Equipment(BaseModel):
    name: str
    slot: EquipmentSlot
    weight: float
