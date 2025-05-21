# db/character.py
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from app.db.attribute import Attribute
from app.db.skill import Skill
from app.db.spell import Spell
from app.db.equipment import Equipment
from app.db.item import InventoryItem

class StatusCondition(str, Enum):
    stunned = "stunned"
    poisoned = "poisoned"
    # Add more status conditions as needed

class Race(str, Enum):
    human = "human"
    elf = "elf"
    # Add more races as needed

class PersonalityTrait(str, Enum):
    brave = "brave"
    optimistic = "optimistic"
    # Add more personality traits as needed

class CharacterBase(BaseModel):
    name: str
    class_id: str
    specialization_id: Optional[str]
    level: int
    experience: int
    experience_for_next_level: int
    attributes: List[Attribute]
    skills: List[Skill]
    spells: List[Spell]
    equipment: List[Equipment]
    inventory: List[InventoryItem]
    status_conditions: List[StatusCondition]
    race: Race
    personality_traits: List[PersonalityTrait]
    background_story: str
    feats: List[str]
    titles: List[str]
    image: Optional[str]

class CharacterCreate(CharacterBase):
    pass

class Character(CharacterBase):
    id: str

    class Config:
        from_attributes = True
