def generate_fleet_advice(
    total_vehicles,
    total_trips,
    avg_battery,
    avg_distance,
    fleet_utilization
):

    advice=[]


    if avg_battery < 40:

        advice.append(
            "⚠️ Battery level is low. Schedule charging."
        )

    elif avg_battery < 70:

        advice.append(
            "🔋 Battery level is moderate."
        )

    else:

        advice.append(
            "✅ Fleet battery health is good."
        )



    if fleet_utilization > 80:

        advice.append(
            "🚚 Fleet usage is high. Check maintenance."
        )

    else:

        advice.append(
            "📊 Fleet utilization is normal."
        )



    if total_trips > 100:

        advice.append(
            "🚦 High trip activity detected."
        )

    else:

        advice.append(
            "🛣️ Trip operations are stable."
        )



    if avg_distance > 200:

        advice.append(
            "⚡ Long routes detected. Optimize charging."
        )


    return advice