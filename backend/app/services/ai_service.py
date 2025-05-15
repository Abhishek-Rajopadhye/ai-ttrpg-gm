from app.models.ai_client import AIModelClient
from app.core.config import get_settings
settings = get_settings()


def init_model_client():
    """
    Initialize the AI model client based on the settings.
    """
    if settings.MODEL_NAME and settings.PROVIDER:
        return AIModelClient(settings)
    else:
        raise ValueError(
            "Model name and provider must be set in the configuration.")


def generate_response(prompt: str, client: AIModelClient = init_model_client(), history: list = []) -> str:
    """
    Generate a response from the AI model based on the prompt and conversation history.
    """
    return client.generate(prompt, history)
