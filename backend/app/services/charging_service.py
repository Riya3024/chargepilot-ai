def smart_charging_plan(
    battery,
    battery_capacity,
    distance
):

    available_energy = (
        battery_capacity *
        battery
    ) / 100

    required_energy = (
        distance * 0.20
    )

    energy_buffer = (
        available_energy -
        required_energy
    )

    trip_feasible = (
        available_energy >=
        required_energy
    )

    if trip_feasible:

        charger = "No Charging Needed"
        charging_required = False
        charging_time = 0
        charging_cost = 0

    else:

        charger = "Fast DC Charger"
        charging_required = True

        deficit = (
            required_energy -
            available_energy
        )

        charging_time = round(
            deficit * 2
        )

        charging_cost = round(
            deficit * 12,
            2
        )

    if battery < 30:
        stress = "High"

    elif battery < 60:
        stress = "Medium"

    else:
        stress = "Low"

    recommendation = (
        "Vehicle can complete trip safely without charging."
        if trip_feasible
        else
        "Charge vehicle before departure to avoid route interruption."
    )

    return {

        "recommended_charger":
            charger,

        "charging_required":
            charging_required,

        "charging_time":
            charging_time,

        "charging_cost":
            charging_cost,

        "battery_stress":
            stress,

        "trip_feasible":
            trip_feasible,

        "available_energy":
            round(
                available_energy,
                2
            ),

        "required_energy":
            round(
                required_energy,
                2
            ),

        "energy_buffer":
            round(
                energy_buffer,
                2
            ),

        "recommendation":
            recommendation,

        "best_window":
            "8 PM - 10 PM"
    }