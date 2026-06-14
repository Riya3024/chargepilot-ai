import { useEffect, useState } from "react";
import API from "../services/api";

export default function FleetAdvisor() {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadAdvisor();
  }, []);

  const loadAdvisor = async () => {

    try {

      const res = await API.get(
        "/fleet-advisor/"
      );

      setData(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  if (!data)
    return (
      <div className="p-8">
        Loading...
      </div>
    );

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Fleet Advisor
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Vehicles</p>

          <h2 className="text-3xl font-bold">
            {data.total_vehicles}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Trips</p>

          <h2 className="text-3xl font-bold">
            {data.total_trips}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Fleet Utilization</p>

          <h2 className="text-3xl font-bold">
            {data.fleet_utilization}%
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Potential Savings</p>

          <h2 className="text-3xl font-bold">
            ₹{data.potential_savings}
          </h2>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-2xl font-bold mb-4">
          AI Insights
        </h2>

        <ul className="space-y-3">

          {data.insights.map(
            (item, index) => (
              <li
                key={index}
                className="border-b pb-2"
              >
                🤖 {item}
              </li>
            )
          )}

        </ul>

      </div>

    </div>
  );
}