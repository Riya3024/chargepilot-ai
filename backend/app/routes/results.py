from fastapi import APIRouter

from app.services.prediction_service import predict_range
from app.services.risk_service import calculate_risk
from app.services.wolfram_service import optimize_trip

router = APIRouter()


@router.post("/")
def analyze_trip(data: dict):

    prediction = predict_range(
        data["battery"],
        data["distance"],
        data["load"],
        data["temperature"]
    )

    risk = calculate_risk(
        data["battery"],
        data["battery_capacity"],
        data["distance"],
        data["load"],
        data["weather"],
        data["traffic"]
    )

    optimization = optimize_trip(
        data["battery"],
        data["battery_capacity"],
        data["distance"]
    )

    estimated_cost = round(
        prediction["predicted_range"] * 0.7,
        2
    )

    return {
        "prediction": prediction,
        "risk": risk,
        "optimization": optimization,
        "estimated_cost": estimated_cost
    }