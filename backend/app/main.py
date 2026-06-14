from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import vehicles
from app.routes import trips
from app.routes import predict
from app.routes import simulate
from app.routes import analytics

from app.routes import fleet_advisor


from app.routes import results
from app.routes import fleet_health

from app.routes import charging

from app.routes import maintenance

from app.routes import chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    vehicles.router,
    prefix="/vehicles",
    tags=["Vehicles"]
)

app.include_router(
    trips.router,
    prefix="/trips",
    tags=["Trips"]
)

app.include_router(
    fleet_advisor.router,
    prefix="/fleet-advisor",
    tags=["Fleet Advisor"]
)

app.include_router(
    predict.router,
    prefix="/predict",
    tags=["Prediction"]
)

app.include_router(
    simulate.router,
    prefix="/simulate",
    tags=["Simulator"]
)

app.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Analytics"]
)


app.include_router(
    maintenance.router,
    prefix="/maintenance",
    tags=["Maintenance"]
)


app.include_router(
    chat.router,
    prefix="/chat",
    tags=["AI Chat"]
)


app.include_router(
    charging.router,
    prefix="/charging",
    tags=["Charging"]
)



app.include_router(
    results.router,
    prefix="/results",
    tags=["Results"]
)

app.include_router(
    fleet_health.router,
    prefix="/fleet-health",
    tags=["Fleet Health"]
)

#@app.get("/")
#def root():
#   return {"message": "ChargePilot AI API Running"}


import os

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


if os.path.exists("static"):

    app.mount(
        "/assets",
        StaticFiles(directory="static/assets"),
        name="assets"
    )


    @app.api_route("/", methods=["GET", "HEAD"])
    def serve_frontend():

        return FileResponse(
            "static/index.html"
        )


    @app.api_route("/{path:path}", methods=["GET", "HEAD"])
    def serve_react(path: str):

        return FileResponse(
            "static/index.html"
        )