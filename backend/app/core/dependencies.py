# core/dependencies.py
from fastapi import Depends, HTTPException, Header
from core.firebase import verify_id_token

def get_current_user(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]  # Expecting "Bearer <token>"
        user_info = verify_id_token(token)
        return user_info
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")
