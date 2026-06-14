import os
import requests

from dotenv import load_dotenv

load_dotenv()

WOLFRAM_APP_ID = os.getenv(
    "WOLFRAM_APP_ID"
)


def calculate_risk(
    battery,
    battery_capacity,
    distance,
    load,
    weather,
    traffic
):

    recommendations = []

    # ==========================
    # AVAILABLE ENERGY
    # ==========================

    available_energy = (
        battery_capacity *
        battery
    ) / 100

    # ==========================
    # BASE ENERGY REQUIRED
    # ==========================

    energy_required = (
        distance * 0.20
    )

    # ==========================
    # WEATHER IMPACT
    # ==========================

    if weather == "Rain":
        energy_required *= 1.10

    elif weather == "Storm":
        energy_required *= 1.25

    # ==========================
    # TRAFFIC IMPACT
    # ==========================

    if traffic == "Medium":
        energy_required *= 1.05

    elif traffic == "High":
        energy_required *= 1.15

    # ==========================
    # LOAD IMPACT
    # ==========================

    if load > 200:
        energy_required *= 1.05

    if load > 500:
        energy_required *= 1.10

    # ==========================
    # WOLFRAM QUERY
    # ==========================

    try:

        query = f"{distance} km to miles"

        response = requests.get(
            "https://api.wolframalpha.com/v1/result",
            params={
                "appid": WOLFRAM_APP_ID,
                "i": query
            }
        )

        wolfram_analysis = response.text

    except Exception:

        wolfram_analysis = (
            "Wolfram analysis unavailable."
        )

    # ==========================
    # UTILIZATION
    # ==========================

    utilization = (
        energy_required /
        available_energy
    ) * 100

    risk_score = min(
        round(utilization),
        100
    )

    # ==========================
    # RISK LEVEL
    # ==========================

    if risk_score >= 80:

        risk_level = "High"

    elif risk_score >= 50:

        risk_level = "Medium"

    else:

        risk_level = "Low"

    # ==========================
    # RECOMMENDATIONS
    # ==========================

    if risk_level == "High":

        recommendations.append(
            "Charge vehicle before departure."
        )

    if weather == "Storm":

        recommendations.append(
            "Severe weather may increase battery consumption."
        )

    if traffic == "High":

        recommendations.append(
            "Heavy traffic may reduce range efficiency."
        )

    if not recommendations:

        recommendations.append(
            "Trip conditions appear healthy."
        )

    # ==========================
    # RETURN
    # ==========================

    return {

        "risk_score":
            risk_score,

        "risk_level":
            risk_level,

        "available_energy":
            round(
                available_energy,
                2
            ),

        "energy_required":
            round(
                energy_required,
                2
            ),

        "ai_insight":
f"""
Vehicle has {round(available_energy,2)} kWh available.
Estimated requirement is {round(energy_required,2)} kWh.
Risk level is {risk_level}.
""",

        "recommendations":
            recommendations
    }