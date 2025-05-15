from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime

# ----- User Schema -----


class User(BaseModel):
    uid: str
    display_name: Optional[str]
    email: Optional[str]
    photo_url: Optional[str]


# ----- Message Schema -----
class Message(BaseModel):
    role: str  # "user" or "gm" (game master)
    content: str
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)


# ----- Game Session -----
class GameSessionCreate(BaseModel):
    title: str
    system: Optional[str] = "Fantasy"  # DnD, Sci-Fi, Horror, etc.
    initial_prompt: str
    visibility: Optional[str] = "private"  # public / private
    user_id: str


class GameSession(GameSessionCreate):
    session_id: str
    messages: List[Message] = []
    created_at: datetime
    updated_at: datetime


# ----- Model Interaction -----
class ModelRequest(BaseModel):
    prompt: str
    system: Optional[str] = "Fantasy"
    history: Optional[List[Message]] = []


class ModelResponse(BaseModel):
    generated_text: str
    tokens_used: Optional[int] = None
    latency_ms: Optional[int] = None
