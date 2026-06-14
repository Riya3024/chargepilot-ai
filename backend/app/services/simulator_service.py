def simulate_trip(
    battery,
    distance,
    load,
    temperature,
    traffic
):

    predicted_range = (
        battery * 3
        - load * 0.05
        - abs(25 - temperature)
    )

    if traffic == "High":
        predicted_range -= 20

    elif traffic == "Medium":
        predicted_range -= 10

    trip_success = min(
        100,
        max(
            0,
            int((predicted_range / distance) * 100)
        )
    )

    risk_score = 0

    if battery < 40:
        risk_score += 40

    if distance > 200:
        risk_score += 30

    if load > 300:
        risk_score += 30

    charging_needed = predicted_range < distance

    return {
        "predicted_range": round(predicted_range),
        "trip_success": trip_success,
        "risk_score": risk_score,
        "charging_needed": charging_needed
    }