import os
import requests

from dotenv import load_dotenv

from app.services.csv_service import read_csv

load_dotenv()

WOLFRAM_APP_ID = os.getenv(
    "WOLFRAM_APP_ID"
)


def generate_fleet_advice():

    vehicles = read_csv("vehicles.csv")
    trips = read_csv("trips.csv")

    # ==========================
    # BASIC METRICS
    # ==========================

    total_vehicles = len(vehicles)
    total_trips = len(trips)

    utilization = 0

    if total_vehicles > 0:

        utilization = round(
            (total_trips / total_vehicles) * 100,
            2
        )

    # ==========================
    # BATTERY ANALYSIS
    # ==========================

    low_battery = 0
    average_battery = 0

    if not vehicles.empty:

        average_battery = round(
            vehicles[
                "current_battery"
            ].mean(),
            2
        )

        low_battery = len(
            vehicles[
                vehicles[
                    "current_battery"
                ] < 30
            ]
        )

    # ==========================
    # TRIP ANALYSIS
    # ==========================

    total_distance = 0
    average_distance = 0
    long_trips = 0

    if not trips.empty:

        total_distance = int(
            trips["distance"].sum()
        )

        average_distance = round(
            trips["distance"].mean(),
            2
        )

        long_trips = len(
            trips[
                trips["distance"] > 200
            ]
        )

    # ==========================
    # COST SAVINGS
    # ==========================

    potential_savings = round(
        total_distance * 0.50,
        2
    )

    # ==========================
    # INSIGHTS
    # ==========================

    insights = []

    if low_battery > 0:

        insights.append(
            f"{low_battery} vehicle(s) require charging."
        )

    if long_trips > 0:

        insights.append(
            f"{long_trips} long-distance trip(s) detected."
        )

    if utilization > 100:

        insights.append(
            "Fleet demand exceeds current capacity."
        )

    elif utilization > 80:

        insights.append(
            "Fleet utilization is high."
        )

    elif utilization < 50:

        insights.append(
            "Fleet utilization is low."
        )

    else:

        insights.append(
            "Fleet utilization is healthy."
        )

    # ==========================
    # WOLFRAM ANALYSIS
    # ==========================

    try:

        query = (
            f"{total_distance} km to miles"
        )

        response = requests.get(
            "https://api.wolframalpha.com/v1/result",
            params={
                "appid": WOLFRAM_APP_ID,
                "i": query
            },
            timeout=10
        )

        wolfram_insight = response.text

    except Exception:

        wolfram_insight = (
            "Wolfram insight unavailable."
        )

    # ==========================
    # AI RECOMMENDATION
    # ==========================

    if utilization > 100:

        ai_recommendation = (
            "Fleet demand is exceeding available vehicle capacity. "
            "Consider expanding the fleet."
        )

    elif low_battery > 0:

        ai_recommendation = (
            "Several vehicles have low battery levels. "
            "Schedule charging before dispatch."
        )

    elif average_battery > 70:

        ai_recommendation = (
            "Fleet batteries are healthy and ready for deployment."
        )

    else:

        ai_recommendation = (
            "Fleet operating normally with balanced utilization."
        )

    # ==========================
    # RETURN
    # ==========================

    return {

        "total_vehicles":
            total_vehicles,

        "total_trips":
            total_trips,

        "fleet_utilization":
            utilization,

        "potential_savings":
            potential_savings,

        "average_battery":
            average_battery,

        "average_distance":
            average_distance,

        "total_distance":
            total_distance,

        "low_battery_vehicles":
            low_battery,

        "long_trips":
            long_trips,

        "insights":
            insights,

        "wolfram_insight":
            wolfram_insight,

        "ai_recommendation":
            ai_recommendation
    }