import { useState } from "react";
import API from "../services/api";

export default function Maintenance() {

  const [form, setForm] = useState({
    battery_health: 80,
    total_trips: 50,
    avg_load: 150,
    avg_distance: 120
  });


  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });

  };



  const analyze = async () => {

    try {

      setLoading(true);

      const res = await API.post(
        "/maintenance",
        form
      );

      setResult(res.data);

    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="p-8">


      <h1 className="text-4xl font-bold mb-8">
        Predictive Maintenance AI
      </h1>



      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">


        <div className="grid md:grid-cols-2 gap-5">



          <div>

            <label className="font-medium">
              Battery Health (%)
            </label>

            <input
              type="number"
              name="battery_health"
              value={form.battery_health}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>



          <div>

            <label className="font-medium">
              Total Trips
            </label>

            <input
              type="number"
              name="total_trips"
              value={form.total_trips}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>




          <div>

            <label className="font-medium">
              Average Load (kg)
            </label>

            <input
              type="number"
              name="avg_load"
              value={form.avg_load}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>



          <div>

            <label className="font-medium">
              Average Distance (km)
            </label>

            <input
              type="number"
              name="avg_distance"
              value={form.avg_distance}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>



        </div>



        <button

          onClick={analyze}

          disabled={loading}

          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"

        >

          {loading 
            ? "Analyzing..."
            : "Analyze Vehicle"}

        </button>



      </div>





      {result && (

        <>


        <div className="grid md:grid-cols-3 gap-6 mt-8">



          <div className="bg-white p-6 rounded-2xl shadow">

            <p className="text-gray-500">
              Vehicle Health
            </p>

            <h2 className="text-4xl font-bold mt-2">

              {result.health_score}%

            </h2>

          </div>




          <div className="bg-white p-6 rounded-2xl shadow">

            <p className="text-gray-500">
              Maintenance Risk
            </p>

            <h2 className="text-4xl font-bold mt-2">

              {result.risk_level}

            </h2>

          </div>




          <div className="bg-white p-6 rounded-2xl shadow">

            <p className="text-gray-500">
              Service Due
            </p>

            <h2 className="text-4xl font-bold mt-2">

              {result.service_due_in_days}
              days

            </h2>

          </div>



        </div>





        <div className="bg-white rounded-2xl shadow p-6 mt-8">


          <h2 className="text-2xl font-bold mb-4">

            AI Maintenance Recommendations

          </h2>



          <ul className="list-disc ml-5 space-y-2">


          {
            result.recommendations.map(
              (item,index)=>(
                <li key={index}>
                  {item}
                </li>
              )
            )
          }


          </ul>


        </div>



        </>

      )}



    </div>

  );

}