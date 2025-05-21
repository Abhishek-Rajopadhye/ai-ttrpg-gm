# db/spell.py
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class SpellType(str, Enum):
    damage = "damage"
    healing = "healing"
    buff = "buff"
    debuff = "debuff"
    utility = "utility"

class SpellTarget(str, Enum):
    self_ = "self"
    single_target = "single_target"
    area_of_effect = "area_of_effect"

class SpellDamageType(str, Enum):
    fire = "fire"
    ice = "ice"
    lightning = "lightning"
    physical = "physical"

class Spell(BaseModel):
    id: str
    name: str
    description: str
    type: SpellType
    target: SpellTarget
    damage_type: Optional[SpellDamageType]
    damage: Optional[int]  # Base damage
    damage_scaling: Optional[str]  # Scaling factor (e.g. "spell_power", "attack_power")
    healing: Optional[int]  # Base healing
    healing_scaling: Optional[str]  # Scaling factor (e.g. "spell_power", "healing_power")
    duration: Optional[int]  # Duration of the spell's effect (in seconds)
    cooldown: int  # Cooldown time (in seconds)
    cost: int  # Resource cost (e.g. mana, stamina)
    range_: Optional[int]  # Range of the spell (if applicable)
