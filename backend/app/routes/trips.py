from fastapi import APIRouter
from uuid import uuid4

from app.models.schemas import TripCreate
from app.services.csv_service import (
    read_csv,
    append_csv,
    _path
)

router = APIRouter()


@router.get("/")
def get_trips():

    df = read_csv("trips.csv")

    if df.empty:
        return []

    df = df.fillna("")

    return df.to_dict(
        orient="records"
    )


@router.post("/")
def create_trip(trip: TripCreate):

    row = {
        "id": str(uuid4()),
        "vehicle_id": trip.vehicle_id,
        "distance": trip.distance,
        "load": trip.load,
        "weather": trip.weather,
        "traffic": trip.traffic
    }

    append_csv(
        "trips.csv",
        row,
        [
            "id",
            "vehicle_id",
            "distance",
            "load",
            "weather",
            "traffic"
        ]
    )

    return {
        "message": "Trip Created"
    }


@router.delete("/{trip_id}")
def delete_trip(trip_id: str):

    df = read_csv("trips.csv")

    if df.empty:
        return {
            "message": "No Trips Found"
        }

    df = df[df["id"] != trip_id]

    df.to_csv(
        _path("trips.csv"),
        index=False
    )

    return {
        "message": "Trip Deleted"
    }