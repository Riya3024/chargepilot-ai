import { useState } from "react";
import API from "../services/api";

export default function Simulator() {
  const [form, setForm] = useState({
    battery: 80,
    distance: 200,
    load: 100,
    temperature: 25,
    traffic: "Low",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "traffic" ? value : Number(value),
    });
  };

  const runSimulation = async () => {
    try {
      setLoading(true);
      const res = await API.post("/simulate", form);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">What-If Simulator</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-medium">Battery (%)</label>
            <input
              type="number"
              name="battery"
              value={form.battery}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Distance (km)</label>
            <input
              type="number"
              name="distance"
              value={form.distance}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Load (kg)</label>
            <input
              type="number"
              name="load"
              value={form.load}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={form.temperature}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Traffic</label>
            <select
              name="traffic"
              value={form.traffic}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">Predicted Range</p>
            <h2 className="text-3xl font-bold mt-2">{result.predicted_range} km</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">Trip Success</p>
            <h2 className="text-3xl font-bold mt-2">{result.trip_success}%</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">Risk Score</p>
            <h2 className="text-3xl font-bold mt-2">{result.risk_score}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">Charging Needed</p>
            <h2 className="text-3xl font-bold mt-2">
              {result.charging_needed ? "Yes" : "No"}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}