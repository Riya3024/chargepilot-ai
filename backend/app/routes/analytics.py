from fastapi import APIRouter
from app.services.analytics_service import (
    get_dashboard_metrics
)

router = APIRouter()

@router.get("/")
def analytics():

    return get_dashboard_metrics()