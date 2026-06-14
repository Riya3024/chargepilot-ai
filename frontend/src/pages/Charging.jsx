import { useState } from "react";
import API from "../services/api";

export default function Charging() {

  const [form, setForm] = useState({
    battery: "",
    battery_capacity: "",
    distance: ""
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {

    try {

      const res = await API.post(
        "/charging/",
        {
          battery: Number(form.battery),
          battery_capacity: Number(
            form.battery_capacity
          ),
          distance: Number(form.distance)
        }
      );

      setResult(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Smart Charging Engine
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="number"
            placeholder="Current Battery %"
            value={form.battery}
            onChange={(e) =>
              setForm({
                ...form,
                battery: e.target.value
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Battery Capacity (kWh)"
            value={form.battery_capacity}
            onChange={(e) =>
              setForm({
                ...form,
                battery_capacity:
                  e.target.value
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Trip Distance (km)"
            value={form.distance}
            onChange={(e) =>
              setForm({
                ...form,
                distance: e.target.value
              })
            }
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="
            mt-5
            bg-green-600
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Generate Charging Plan
        </button>

      </div>

      {result && (

<div className="mt-8">

  <h2 className="text-3xl font-bold mb-6">
    Charging Intelligence Report
  </h2>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Recommended Charger
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.recommended_charger}
      </h3>
    </div>

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Trip Feasible
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.trip_feasible
          ? "YES"
          : "NO"}
      </h3>
    </div>

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Available Energy
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.available_energy} kWh
      </h3>
    </div>

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Required Energy
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.required_energy} kWh
      </h3>
    </div>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Energy Buffer
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.energy_buffer} kWh
      </h3>
    </div>

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Charging Time
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.charging_time} mins
      </h3>
    </div>

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Charging Cost
      </p>

      <h3 className="text-xl font-bold mt-2">
        ₹{result.charging_cost}
      </h3>
    </div>

    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">
        Battery Stress
      </p>

      <h3 className="text-xl font-bold mt-2">
        {result.battery_stress}
      </h3>
    </div>

  </div>

  <div className="bg-white p-6 rounded-xl shadow mt-6">

    <h3 className="text-xl font-bold mb-3">
      AI Recommendation
    </h3>

    <p className="mb-3">
      {result.recommendation}
    </p>

    <p>
      <strong>
        Best Charging Window:
      </strong>
      {" "}
      {result.best_window}
    </p>

  </div>

</div>

)}
</div>
  );
}