# backend/app/routes/vehicles.py

from fastapi import APIRouter
from uuid import uuid4

from app.models.schemas import VehicleCreate
from app.services.csv_service import (
    read_csv,
    append_csv
)

router = APIRouter()


@router.get("/")
def get_vehicles():

    df = read_csv("vehicles.csv")

    return df.to_dict(
        orient="records"
    )


@router.post("/")
def create_vehicle(
    vehicle: VehicleCreate
):

    row = {
        "id": str(uuid4()),
        "vehicle_name": vehicle.vehicle_name,
        "battery_capacity": vehicle.battery_capacity,
        "current_battery": vehicle.current_battery
    }

    append_csv(
        "vehicles.csv",
        row,
        [
            "id",
            "vehicle_name",
            "battery_capacity",
            "current_battery"
        ]
    )

    return {
        "message": "Vehicle Created"
    }


@router.delete("/{vehicle_id}")
def delete_vehicle(vehicle_id: str):

    df = read_csv("vehicles.csv")

    if df.empty:
        return {
            "message": "No Vehicles Found"
        }

    df = df[
        df["id"] != vehicle_id
    ]

    from app.services.csv_service import _path

    df.to_csv(
        _path("vehicles.csv"),
        index=False
    )

    return {
        "message": "Vehicle Deleted"
    }