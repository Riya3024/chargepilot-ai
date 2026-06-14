from fastapi import APIRouter

from app.models.schemas import (
    ChargingRequest
)

from app.services.charging_service import (
    smart_charging_plan
)

router = APIRouter()


@router.post("/")
def charging(
    request: ChargingRequest
):

    return smart_charging_plan(
        request.battery,
        request.battery_capacity,
        request.distance
    )