import os
import requests

from dotenv import load_dotenv

load_dotenv()

WOLFRAM_APP_ID = os.getenv("WOLFRAM_APP_ID")


def generate_ai_insight(
    battery,
    distance,
    load,
    weather,
    traffic,
    available_energy,
    required_energy,
    risk_level
):

    try:

        query = f"""
        Electric vehicle trip:
        battery {battery} percent,
        distance {distance} km,
        load {load} kg,
        weather {weather},
        traffic {traffic}
        """

        response = requests.get(
            "https://api.wolframalpha.com/v1/result",
            params={
                "appid": WOLFRAM_APP_ID,
                "i": query
            }
        )

        wolfram_text = response.text

    except Exception:

        wolfram_text = "No external insight available"

    return f"""
Fleet AI Analysis

Available Energy:
{round(available_energy,2)} kWh

Required Energy:
{round(required_energy,2)} kWh

Risk Level:
{risk_level}

External Analysis:
{wolfram_text}
"""