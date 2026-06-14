import { useEffect, useState } from "react";
import API from "../services/api";

export default function FleetHealth() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadHealth();
  }, []);

  const loadHealth = async () => {

    try {

      const res = await API.get(
        "/fleet-health/"
      );

      setVehicles(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Fleet Health Monitor
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {vehicles.map((vehicle, index) => (

  <div
    key={index}
    className="bg-white p-6 rounded-xl shadow"
  >

    <h2 className="text-2xl font-bold mb-4">
      {vehicle.vehicle_name}
    </h2>

    <p className="mb-2">
      🔋 Battery:
      {" "}
      {vehicle.battery}%
    </p>

    <p className="mb-2">
      ❤️ Health:
      {" "}
      {vehicle.health}%
    </p>

    <p className="mb-2">
      📊 Status:
      {" "}
      <span
        className={
          vehicle.status === "Healthy"
            ? "text-green-600 font-bold"
            : vehicle.status === "Warning"
            ? "text-yellow-600 font-bold"
            : "text-red-600 font-bold"
        }
      >
        {vehicle.status}
      </span>
    </p>

    <p className="mb-2">
      ⏳ Remaining Life:
      {" "}
      {vehicle.remaining_life}
    </p>

    <p>
      🛠 Maintenance Score:
      {" "}
      {vehicle.maintenance_score}
    </p>

  </div>

))}
</div>

    </div>
  );
}