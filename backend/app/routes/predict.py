from fastapi import APIRouter

from app.services.prediction_service import predict_range
from app.services.risk_service import calculate_risk
from app.services.optimization_service import optimize_trip

router = APIRouter()

@router.post("/")
def predict(data: dict):

    prediction = predict_range(
        data["battery"],
        data["distance"],
        data["load"],
        data["temperature"]
    )

    risk = calculate_risk(
        data["battery"],
        data["distance"],
        data["load"]
    )

    optimization = optimize_trip(
        data["battery"],
        data["distance"]
    )

    return {
        **prediction,
        **risk,
        **optimization
    }