from fastapi import APIRouter

from app.services.fleet_health_service import (
    get_fleet_health
)

router = APIRouter()


@router.get("/")
def fleet_health():

    return get_fleet_health()