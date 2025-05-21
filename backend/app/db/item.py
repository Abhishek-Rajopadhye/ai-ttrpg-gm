# db/item.py
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class Rarity(str, Enum):
    common = "common"
    uncommon = "uncommon"
    rare = "rare"
    epic = "epic"
    legendary = "legendary"

class AttributeBonus(BaseModel):
    attribute: str
    bonus: int

class SkillBonus(BaseModel):
    skill: str
    bonus: int

class SetBonus(BaseModel):
    set_name: str
    bonus: str  # Description of the bonus
    required_pieces: int  # Number of pieces required to activate the bonus

class ItemBase(BaseModel):
    id: str
    name: str
    rarity: Rarity
    weight: float
    cost: int  # In-game currency
    description: str
    image: Optional[str]
    attribute_bonuses: List[AttributeBonus]
    skill_bonuses: List[SkillBonus]
    set_bonuses: List[SetBonus]
    set_id: Optional[str]  # ID of the set this item belongs to


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: str

    class Config:
        from_attributes = True

class ItemSet(BaseModel):
    id: str
    name: str
    description: str
    pieces: List[str]  # IDs of the items in the set
    bonuses: List[SetBonus]

class InventoryItem(BaseModel):
    name: str
    weight: float
    quantity: int
