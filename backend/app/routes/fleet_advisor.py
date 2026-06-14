from fastapi import APIRouter

from app.services.fleet_advisor_service import (
    generate_fleet_advice
)

router = APIRouter()


@router.get("/")
def advisor():

    return generate_fleet_advice()