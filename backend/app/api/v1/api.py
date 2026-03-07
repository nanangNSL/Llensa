from fastapi import APIRouter
from app.api.v1.endpoints import docs, health

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(docs.router, prefix="/docs", tags=["documents"])
