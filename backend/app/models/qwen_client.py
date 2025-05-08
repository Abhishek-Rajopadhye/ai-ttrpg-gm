from huggingface_hub import InferenceClient
from db.schemas import Message
from typing import List
from app.core.config import get_settings

settings = get_settings()

class QwenClient:
    def __init__(self):
        self.client = InferenceClient(
            provider="sambanova",
            api_key=settings.HF_API_TOKEN
        )
        self.model_id = "Qwen/Qwen3-32B"

    def format_messages(self, prompt: str, history: List[Message]) -> List[dict]:
        messages = [{"role": msg.role, "content": msg.content} for msg in history]
        messages.append({"role": "user", "content": prompt})
        return messages

    def generate(self, prompt: str, history: List[Message] = []) -> str:
        messages = self.format_messages(prompt, history)
        completion = self.client.chat.completions.create(
            model=self.model_id,
            messages=messages
        )
        return completion.choices[0].message["content"]