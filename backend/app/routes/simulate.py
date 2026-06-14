from fastapi import APIRouter

from app.models.schemas import (
    SimulatorRequest
)

from app.services.simulator_service import (
    simulate_trip
)

router = APIRouter()


@router.post("/")
def simulate(
    request: SimulatorRequest
):

    return simulate_trip(
        request.battery,
        request.distance,
        request.load,
        request.temperature,
        request.traffic
    )