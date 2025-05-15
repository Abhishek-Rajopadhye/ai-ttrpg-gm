from fastapi import APIRouter, Depends, HTTPException
from app.services.ai_service import generate_response, init_model_client
from app.models.ai_client import AIModelClient
router = APIRouter()

@router.get("/")
async def read_root():
    return {"message": "Welcome to the AI API!"}

@router.get("/generate")
async def generate_response(prompt: str):
    """
    Generate a response from the AI model based on the prompt and conversation history.
    """
    try:
        response = generate_response(prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))