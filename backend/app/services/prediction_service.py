def predict_range(
    battery,
    distance,
    load,
    temperature
):

    predicted_range = (
        battery * 3
        - load * 0.05
        - abs(25 - temperature)
    )

    trip_success = min(
        100,
        max(
            0,
            int((predicted_range / distance) * 100)
        )
    )

    return {
        "predicted_range": round(predicted_range),
        "trip_success": trip_success
    }