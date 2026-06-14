# backend/app/models/schemas.py

from pydantic import BaseModel


# =====================================
# VEHICLES
# =====================================

class VehicleCreate(BaseModel):
    vehicle_name: str
    battery_capacity: int
    current_battery: int


# =====================================
# TRIPS
# =====================================

class TripCreate(BaseModel):
    vehicle_id: str
    distance: int
    load: int
    weather: str
    traffic: str


# =====================================
# AI PREDICTION
# =====================================

class PredictionRequest(BaseModel):
    battery: int
    distance: int
    load: int
    temperature: int


# =====================================
# SIMULATOR
# =====================================

class SimulatorRequest(BaseModel):
    battery: int
    distance: int
    load: int
    temperature: int
    traffic: str


# =====================================
# RISK ANALYSIS
# =====================================

class RiskRequest(BaseModel):
    vehicle_id: str
    distance: int
    load: int
    weather: str
    traffic: str


# =====================================
# CHARGING OPTIMIZATION
# =====================================

class OptimizationRequest(BaseModel):
    vehicle_id: str
    distance: int
    current_battery: int


# =====================================
# DASHBOARD ANALYTICS
# =====================================

class AnalyticsResponse(BaseModel):
    total_vehicles: int
    total_trips: int
    avg_battery: float
    avg_distance: float


# =====================================
# WOLFRAM OPTIMIZATION
# =====================================

class OptimizationRequest(BaseModel):
    battery: int
    battery_capacity: int
    distance: int

# =====================================
# FLEET RISK ENGINE
# =====================================

# =====================================
# FLEET RISK ENGINE
# =====================================

class RiskRequest(BaseModel):
    battery: int
    battery_capacity: int
    distance: int
    load: int
    weather: str
    traffic: str

class ChargingRequest(BaseModel):
    battery: int
    battery_capacity: int
    distance: int