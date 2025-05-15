from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.ai import router as ai_router
from app.api.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/static", StaticFiles(directory="frontend/dist/static"), name="static")
# app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="index")

app.include_router(ai_router, prefix="/api/ai", tags=["AI"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])