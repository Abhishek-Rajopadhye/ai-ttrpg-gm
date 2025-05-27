from pydantic import BaseModel
from typing import List, Optional

class POI(BaseModel):
    id: str
    name: str
    type: Optional[str] = ""
    description: Optional[str] = ""
    location: dict  # GeoJSON Point

class Area(BaseModel):
    id: str
    name: str
    type: Optional[str] = ""
    description: Optional[str] = ""
    boundary: dict  # GeoJSON Polygon

class WorldBase(BaseModel):
    name: str
    type: Optional[str] = ""
    description: Optional[str] = ""
    areas: List[Area] = []
    pois: List[POI] = []
    map_image: Optional[str] = None  # base64 or URL

class WorldCreate(BaseModel):
    name: str
    type: Optional[str] = ""
    description: Optional[str] = ""
    by_user: str

class World(WorldBase):
    id: str
    by_user: str

class WorldUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    areas: Optional[List[Area]] = None
    pois: Optional[List[POI]] = None
    map_image: Optional[str] = None
    by_user: Optional[str] = None