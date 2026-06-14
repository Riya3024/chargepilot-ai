import { useEffect, useState } from "react";
import API from "../services/api";

export default function Vehicles() {

  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    vehicle_name: "",
    battery_capacity: "",
    current_battery: ""
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await API.get("/vehicles/");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createVehicle = async () => {

    try {

      await API.post(
        "/vehicles/",
        {
          vehicle_name: form.vehicle_name,
          battery_capacity: Number(
            form.battery_capacity
          ),
          current_battery: Number(
            form.current_battery
          )
        }
      );

      setForm({
        vehicle_name: "",
        battery_capacity: "",
        current_battery: ""
      });

      loadVehicles();

    } catch (err) {
      console.error(err);
    }
  };

  const deleteVehicle = async (id) => {

    try {

      await API.delete(
        `/vehicles/${id}`
      );

      loadVehicles();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Fleet Vehicles
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="vehicle_name"
            placeholder="Vehicle Name"
            value={form.vehicle_name}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="battery_capacity"
            placeholder="Battery Capacity"
            value={form.battery_capacity}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="current_battery"
            placeholder="Current Battery %"
            value={form.current_battery}
            onChange={handleChange}
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={createVehicle}
          className="mt-4 bg-blue-600 text-white px-5 py-3 rounded"
        >
          Add Vehicle
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {vehicles.map((vehicle) => (

          <div
            key={vehicle.id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold">
              {vehicle.vehicle_name}
            </h2>

            <p className="mt-2">
              Battery Capacity:
              {" "}
              {vehicle.battery_capacity}
              {" "}
              kWh
            </p>

            <p>
              Current Battery:
              {" "}
              {vehicle.current_battery}
              %
            </p>

            <button
              onClick={() =>
                deleteVehicle(vehicle.id)
              }
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}