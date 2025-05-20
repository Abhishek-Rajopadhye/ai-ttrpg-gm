# db/item.py
from pydantic import BaseModel
from typing import Optional


class ItemBase(BaseModel):
    name: str
    description: str
    type: str
    weight: float
    cost: float
    properties: Optional[dict]


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: str

    class Config:
        from_attributes = True
