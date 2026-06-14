from app.services.csv_service import read_csv


def get_fleet_health():

    vehicles = read_csv("vehicles.csv")

    if vehicles.empty:
        return []

    result = []

    for _, vehicle in vehicles.iterrows():

        battery = float(
            vehicle["current_battery"]
        )

        health = round(
            battery * 1.1,
            2
        )

        if battery >= 70:
            status = "Healthy"

        elif battery >= 40:
            status = "Warning"

        else:
            status = "Critical"

        result.append({

            "vehicle_name":
                vehicle["vehicle_name"],

            "battery":
                battery,

            "health":
                min(health, 100),

            "status":
                status
        })

    return result