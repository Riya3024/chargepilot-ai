def predict_maintenance(
    battery_health,
    total_trips,
    avg_load,
    avg_distance
):

    risk_score = 0
    recommendations = []


    # Battery analysis

    if battery_health < 50:

        risk_score += 40

        recommendations.append(
            "Battery health is low. Schedule battery inspection soon."
        )

    elif battery_health < 75:

        risk_score += 20

        recommendations.append(
            "Battery health is moderate. Monitor charging performance."
        )

    else:

        recommendations.append(
            "Battery health is good. Continue regular charging cycles."
        )



    # Usage analysis

    if total_trips > 100:

        risk_score += 20

        recommendations.append(
            "High trip frequency detected. Check vehicle wear components."
        )

    else:

        recommendations.append(
            "Vehicle usage is within normal operating range."
        )



    # Load analysis

    if avg_load > 300:

        risk_score += 20

        recommendations.append(
            "High load detected. Reduce payload to improve efficiency."
        )

    else:

        recommendations.append(
            "Average load is acceptable for vehicle operation."
        )



    # Distance analysis

    if avg_distance > 250:

        risk_score += 15

        recommendations.append(
            "Frequent long distance trips may increase maintenance needs."
        )

    else:

        recommendations.append(
            "Trip distance pattern looks healthy."
        )



    health_score = max(
        100 - risk_score,
        0
    )



    if risk_score >= 60:

        risk_level = "High"
        service_days = 7


    elif risk_score >= 30:

        risk_level = "Medium"
        service_days = 20


    else:

        risk_level = "Low"
        service_days = 45



    return {

        "health_score": health_score,

        "risk_level": risk_level,

        "service_due_in_days": service_days,

        "recommendations": recommendations

    }