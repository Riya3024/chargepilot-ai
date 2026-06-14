def fleet_chat(question, fleet_data):

    question = question.lower()


    vehicles = fleet_data.get(
        "vehicles",
        []
    )


    if "charging" in question or "battery" in question:

        low_battery = []

        for vehicle in vehicles:

            if vehicle.get("battery",100) < 40:

                low_battery.append(
                    vehicle.get("name")
                )


        if len(low_battery) > 0:

            return (
                "⚡ Charging Required: "
                + ", ".join(low_battery)
                + " have low battery."
            )


        return (
            "All vehicles have sufficient battery levels."
        )



    if "risk" in question:

        risk = fleet_data.get(
            "avg_risk",
            0
        )


        if risk > 50:

            return (
                "⚠️ Fleet risk is high. "
                "Review trips and vehicle conditions."
            )


        return (
            "✅ Fleet risk is currently low."
        )



    if "trip" in question:

        trips = fleet_data.get(
            "total_trips",
            0
        )

        return (
            f"Fleet completed {trips} trips."
        )



    if "maintenance" in question:

        return (
            "🔧 Maintenance AI is monitoring "
            "battery health, distance and load patterns."
        )



    return (
        "I can help with charging, "
        "risk analysis, trips and maintenance."
    )