# db/skill.py
from pydantic import BaseModel
from typing import Optional
from enum import Enum

class SkillType(str, Enum):
    resistance = "resistance"
    proficiency = "proficiency"
    expertise = "expertise"
    boost = "boost"

class Skill(BaseModel):
    id: str
    name: str
    description: str
    type: SkillType
    effect: str  # Description of the effect
    value: Optional[int]  # Value of the effect (e.g. +10% resistance)
    applies_to: Optional[str]


class SkillProficiencyBoost(BaseModel):
    skill: str
    boost: int