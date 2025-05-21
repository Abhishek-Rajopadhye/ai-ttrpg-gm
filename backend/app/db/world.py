# db/world.py
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class POI(BaseModel):
    id: str
    name: str
    type: str
    description: str
    location: dict  # GeoJSON point representing the POI's location

class Area(BaseModel):
    id: str
    name: str
    type: str
    description: str
    boundary: dict  # GeoJSON polygon representing the area's boundary
    pois: List[POI]

class WorldBase(BaseModel):
    name: str
    type: str
    description: str
    areas: List[Area]
    pois: List[POI]
    map_image: Optional[str]  # URL or data for the custom map image
    by_user: str

class WorldCreate(WorldBase):
    pass

class World(WorldBase):
    id: str

class WorldUpdate(BaseModel):
    name: Optional[str]
    type: Optional[str]
    description: Optional[str]
    areas: Optional[List[Area]]
    pois: Optional[List[POI]]
    map_image: Optional[str]
    by_user: str
