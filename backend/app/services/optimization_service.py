def optimize_trip(
    battery,
    distance
):

    if distance > battery * 2:

        return {
            "station": "ChargeHub A",
            "charging_time": 25
        }

    return {
        "station": "No Charging Required",
        "charging_time": 0
    }