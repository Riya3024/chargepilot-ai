import os
import requests

from dotenv import load_dotenv

load_dotenv()

WOLFRAM_APP_ID = os.getenv(
    "WOLFRAM_APP_ID"
)


def optimize_trip(
    battery: int,
    battery_capacity: int,
    distance: int
):

    try:

        query = (
            f"electric vehicle energy required "
            f"to travel {distance} km "
            f"with battery capacity "
            f"{battery_capacity} kWh"
        )

        response = requests.get(
            "https://api.wolframalpha.com/v1/result",
            params={
                "appid": WOLFRAM_APP_ID,
                "i": query
            }
        )

        wolfram_result = response.text

        available_energy = (
            battery_capacity
            * battery
            / 100
        )

        estimated_energy_needed = (
            distance * 0.2
        )

        trip_feasible = (
            available_energy
            >= estimated_energy_needed
        )

        recommended_charge = max(
            battery,
            int(
                (
                    estimated_energy_needed
                    / battery_capacity
                )
                * 100
            ) + 20
        )

        return {
            "battery": battery,
            "battery_capacity": battery_capacity,
            "distance": distance,

            "available_energy":
                round(
                    available_energy,
                    2
                ),

            "estimated_energy_needed":
                round(
                    estimated_energy_needed,
                    2
                ),

            "recommended_charge":
                min(
                    recommended_charge,
                    100
                ),

            "trip_feasible":
                trip_feasible,

            "wolfram_analysis":
                wolfram_result
        }

    except Exception as e:

        return {
            "error": str(e)
        }
    
