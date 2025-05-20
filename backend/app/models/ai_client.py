from huggingface_hub import InferenceClient
from app.core.config import get_settings
from app.db.schemas import Message
from typing import List

settings = get_settings()


class AIModelClient:

    def __init__(self, settings):
        """
        settings: an object or dict with at least
            - model_name: str
            - provider: str (currently only 'huggingface' supported)
            - hf_token: str (optional, for Hugging Face gated models)
        """
        self.model_name = settings.MODEL_NAME
        self.provider = settings.PROVIDER
        self.hf_token = settings.HF_API_KEY

        self.client = InferenceClient(provider=self.provider,
                                      model=self.model_name,
                                      token=self.hf_token)

    def get_client(self):
        """
        Returns the client object for the AI model.
        """
        return self.client

    def format_messages(self, prompt: str,
                        history: List[Message]) -> List[dict]:
        messages = [{
            "role": msg.role,
            "content": msg.content
        } for msg in history]
        messages.append({"role": "user", "content": prompt})
        return messages

    def generate(self, prompt: str, history: List[Message] = []) -> str:
        messages = self.format_messages(prompt, history)
        completion = self.client.chat.completions.create(model=self.model_name,
                                                         messages=messages)
        return completion.choices[0].message["content"]
