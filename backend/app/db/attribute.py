# db/attribute.py
from pydantic import BaseModel
from enum import Enum

class AttributeName(str, Enum):
    strength = "strength"
    dexterity = "dexterity"
    wisdom = "wisdom"
    intelligence = "intelligence"
    charisma = "charisma"
    perception = "perception"
    willpower = "willpower"
    endurance = "endurance"

class Attribute(BaseModel):
    name: AttributeName
    value: int

class AttributeBonus(BaseModel):
    attribute: str
    bonus: int