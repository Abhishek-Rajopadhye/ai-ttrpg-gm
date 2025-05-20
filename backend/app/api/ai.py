from fastapi import APIRouter, HTTPException
from fastapi import Body
from pydantic import BaseModel
from app.services.ai_service import generate_response

router = APIRouter()


class GenerateRequest(BaseModel):
    prompt: str


@router.post("/generate")
async def generate_response_endpoint(data: GenerateRequest):
    """
    Generate a response from the AI model based on the prompt and conversation history.
    """
    try:
        prompt = data.prompt
        response = generate_response(prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
