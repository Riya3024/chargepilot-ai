import { useState } from "react";
import { analyzeTrip } from "../services/api";

export default function Results() {

  const [form, setForm] = useState({
    battery: 80,
    battery_capacity: 120,
    distance: 150,
    load: 100,
    temperature: 25,
    weather: "Clear",
    traffic: "Low"
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value
    });
  };

  const runAnalysis = async () => {

    const data =
      await analyzeTrip(form);

    setResult(data);
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Trip Analysis
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            name="battery"
            placeholder="Battery %"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="battery_capacity"
            placeholder="Battery Capacity"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="distance"
            placeholder="Distance"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="load"
            placeholder="Load"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="temperature"
            placeholder="Temperature"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="weather"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Clear</option>
            <option>Rain</option>
            <option>Storm</option>
          </select>

          <select
            name="traffic"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <button
          onClick={runAnalysis}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Analyze Trip
        </button>

      </div>

      {result && (

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Predicted Range</h3>
            <p className="text-3xl font-bold">
              {result.prediction.predicted_range}
              km
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Trip Success</h3>
            <p className="text-3xl font-bold">
              {result.prediction.trip_success}%
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Risk Level</h3>
            <p className="text-3xl font-bold">
              {result.risk.risk_level}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Estimated Cost</h3>
            <p className="text-3xl font-bold">
              ₹{result.estimated_cost}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
  <h3>Risk Score</h3>
  <p className="text-3xl font-bold">
    {result.risk.risk_score}
  </p>
</div>

<div className="bg-white p-5 rounded-xl shadow">
  <h3>Available Energy</h3>
  <p className="text-3xl font-bold">
    {result.risk.available_energy} kWh
  </p>
</div>

<div className="bg-white p-5 rounded-xl shadow">
  <h3>Energy Required</h3>
  <p className="text-3xl font-bold">
    {result.risk.energy_required} kWh
  </p>
</div>

<div className="bg-white p-5 rounded-xl shadow">
  <h3>Recommended Charge</h3>
  <p className="text-3xl font-bold">
    {result.optimization.recommended_charge}%
  </p>
</div>

<div className="mt-8 bg-white p-6 rounded-xl shadow">

  <h2 className="text-2xl font-bold mb-4">
    AI Recommendation
  </h2>

  <ul className="list-disc ml-5">

    {result.risk.recommendations.map(
      (item, index) => (
        <li key={index}>
          {item}
        </li>
      )
    )}

  </ul>

</div>

        </div>

      )}

    </div>
  );
}