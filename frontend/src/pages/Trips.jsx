// frontend/src/pages/Trips.jsx

import { useEffect, useState } from "react";
import API from "../services/api";

export default function Trips() {

  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);

  const [form, setForm] = useState({
    vehicle_id: "",
    distance: "",
    load: "",
    weather: "Clear",
    traffic: "Low"
  });

  useEffect(() => {
    loadVehicles();
    loadTrips();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await API.get("/vehicles/");
      setVehicles(res.data);

      if (res.data.length > 0) {
        setForm(prev => ({
          ...prev,
          vehicle_id: res.data[0].id
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadTrips = async () => {
    try {
      const res = await API.get("/trips/");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTrip = async () => {
    try {

      await API.post("/trips/", {
        vehicle_id: form.vehicle_id,
        distance: Number(form.distance),
        load: Number(form.load),
        weather: form.weather,
        traffic: form.traffic
      });

      setForm(prev => ({
        ...prev,
        distance: "",
        load: ""
      }));

      loadTrips();

    } catch (err) {
      console.error(err);
    }
  };

  const deleteTrip = async (id) => {
    try {

      await API.delete(`/trips/${id}`);

      loadTrips();

    } catch (err) {
      console.error(err);
    }
  };

  const getVehicleName = (vehicleId) => {

    const vehicle = vehicles.find(
      v => v.id === vehicleId
    );

    return vehicle
      ? vehicle.vehicle_name
      : "Unknown Vehicle";
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Fleet Trips
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={form.vehicle_id}
            onChange={(e) =>
              setForm({
                ...form,
                vehicle_id: e.target.value
              })
            }
            className="border p-3 rounded"
          >
            {vehicles.map(vehicle => (
              <option
                key={vehicle.id}
                value={vehicle.id}
              >
                {vehicle.vehicle_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Distance (km)"
            value={form.distance}
            onChange={(e) =>
              setForm({
                ...form,
                distance: e.target.value
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Load (kg)"
            value={form.load}
            onChange={(e) =>
              setForm({
                ...form,
                load: e.target.value
              })
            }
            className="border p-3 rounded"
          />

          {/* Weather */}
<div>
  <label
    htmlFor="weather"
    className="block text-sm font-semibold text-gray-700 mb-2"
  >
    Weather Conditions
  </label>

  <select
    id="weather"
    value={form.weather}
    onChange={(e) =>
      setForm({
        ...form,
        weather: e.target.value
      })
    }
    className="
      w-full
      border
      border-gray-300
      rounded-lg
      p-3
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  >
    <option value="Clear">
      ☀️ Clear
    </option>

    <option value="Rain">
      🌧️ Rain
    </option>

    <option value="Storm">
      ⛈️ Storm
    </option>
  </select>

  <p className="text-xs text-gray-500 mt-1">
    Weather impacts battery efficiency and trip risk.
  </p>
</div>


{/* Traffic */}
<div>
  <label
    htmlFor="traffic"
    className="block text-sm font-semibold text-gray-700 mb-2"
  >
    Traffic Level
  </label>

  <select
    id="traffic"
    value={form.traffic}
    onChange={(e) =>
      setForm({
        ...form,
        traffic: e.target.value
      })
    }
    className="
      w-full
      border
      border-gray-300
      rounded-lg
      p-3
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  >
    <option value="Low">
      🟢 Low Traffic
    </option>

    <option value="Medium">
      🟡 Medium Traffic
    </option>

    <option value="High">
      🔴 High Traffic
    </option>
  </select>

  <p className="text-xs text-gray-500 mt-1">
    Higher traffic increases energy consumption.
  </p>
</div>

          

        </div>

        <button
          onClick={createTrip}
          className="mt-4 bg-blue-600 text-white px-5 py-3 rounded"
        >
          Create Trip
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {trips.map((trip) => (

          <div
            key={trip.id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold">
              {getVehicleName(
                trip.vehicle_id
              )}
            </h2>

            <p className="mt-2">
              Distance:
              {" "}
              {trip.distance}
              {" "}
              km
            </p>

            <p>
              Load:
              {" "}
              {trip.load}
              {" "}
              kg
            </p>

            <p>
              Weather:
              {" "}
              {trip.weather}
            </p>

            <p>
              Traffic:
              {" "}
              {trip.traffic}
            </p>

            <button
              onClick={() =>
                deleteTrip(trip.id)
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