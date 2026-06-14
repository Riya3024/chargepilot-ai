from fastapi import APIRouter

from app.services.maintenance_service import (
    predict_maintenance
)


router = APIRouter()


@router.post("/")
def maintenance(data: dict):

    result = predict_maintenance(

        data["battery_health"],

        data["total_trips"],

        data["avg_load"],

        data["avg_distance"]

    )


    return result