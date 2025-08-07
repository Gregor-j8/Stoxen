from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/portfolio",
    tags=["portfolio"]
)