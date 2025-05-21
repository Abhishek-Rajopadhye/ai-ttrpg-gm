# db/player_class.py
from pydantic import BaseModel
from typing import Optional, List
from app.db.attribute import AttributeBonus
from app.db.skill import SkillProficiencyBoost

class ClassBase(BaseModel):
    name: str
    spell_ids: List[str]
    attribute_bonuses: List[AttributeBonus]
    skills: List[str]
    skill_proficiency_boosts: List[SkillProficiencyBoost]
    parent_class_id: Optional[str]
    specializations: List[str]

class ClassCreate(ClassBase):
    pass

class Class(ClassBase):
    id:str

class ClassUpdate(BaseModel):
    name: Optional[str]
    spell_ids: Optional[List[str]]
    attribute_bonuses: Optional[List[AttributeBonus]]
    skills: Optional[List[str]]
    skill_proficiency_boosts: Optional[List[SkillProficiencyBoost]]
    parent_class_id: Optional[Optional[str]]
    specializations: Optional[List[str]
]
class SpecializationBase(BaseModel):
    name: str
    attribute_bonuses: List[AttributeBonus]
    skill_proficiency_boosts: List[SkillProficiencyBoost]
    required_class_id: str
    required_level: int

class Specialization(SpecializationBase):
    id: str

class SpecializationCreate(SpecializationBase):
    pass

class SpecializationUpdate(BaseModel):
    name: Optional[str]
    attribute_bonuses: Optional[List[AttributeBonus]]
    skill_proficiency_boosts: Optional[List[SkillProficiencyBoost]]
    required_class_id: Optional[str]
    required_level: Optional[int]

