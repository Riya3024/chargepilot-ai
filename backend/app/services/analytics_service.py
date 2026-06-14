from app.services.advisor_service import (
    generate_fleet_advice
)



def get_dashboard_metrics():


    total_vehicles = 10
    total_trips = 50
    avg_battery = 75
    avg_distance = 180
    fleet_utilization = 60



    fleet_advisor = generate_fleet_advice(

        total_vehicles,

        total_trips,

        avg_battery,

        avg_distance,

        fleet_utilization

    )



    return {

        "total_vehicles":
            total_vehicles,


        "total_trips":
            total_trips,


        "avg_battery":
            avg_battery,


        "avg_distance":
            avg_distance,


        "fleet_utilization":
            fleet_utilization,


        "fleet_advisor":
            fleet_advisor

    }