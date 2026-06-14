import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {


  const [metrics, setMetrics] = useState({

    total_vehicles: 0,

    total_trips: 0,

    avg_battery: 0,

    avg_distance: 0,

    fleet_utilization: 0,

    fleet_advisor: []

});



  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");
  const [loading,setLoading]=useState(false);



  useEffect(()=>{

    loadAnalytics();

  },[]);



  const loadAnalytics = async()=>{

    try{

      const res =
      await API.get("/analytics/");

      setMetrics(res.data);

    }
    catch(err){

      console.log(err);

    }

  };





  const askAI = async()=>{


    try{

      setLoading(true);


      const res =
      await API.post(
        "/chat",
        {
          question,

          fleet:{

            avg_risk:30,

            total_trips:
              metrics.total_trips,


            vehicles:[

              {
                name:"EV-01",
                battery:metrics.avg_battery
              }

            ]

          }

        }
      );


      setAnswer(
        res.data.answer
      );


    }
    catch(err){

      console.log(err);

    }
    finally{

      setLoading(false);

    }


  };





return (

<div className="p-8 bg-slate-100 min-h-screen">


<h1 className="text-4xl font-bold mb-2">
Fleet Dashboard
</h1>


<p className="text-gray-500 mb-8">
AI powered EV fleet monitoring system
</p>




{/* Metrics */}

<div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">



<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">
Vehicles
</p>

<h2 className="text-4xl font-bold mt-3">
{metrics.total_vehicles}
</h2>

</div>




<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">
Trips
</p>

<h2 className="text-4xl font-bold mt-3">
{metrics.total_trips}
</h2>

</div>




<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">
Avg Battery
</p>

<h2 className="text-4xl font-bold mt-3">
{metrics.avg_battery}%
</h2>

</div>




<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">
Distance
</p>

<h2 className="text-4xl font-bold mt-3">
{metrics.avg_distance}
km
</h2>

</div>




<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">
Utilization
</p>

<h2 className="text-4xl font-bold mt-3">
{metrics.fleet_utilization}%
</h2>

</div>



</div>





{/* AI Sections */}


<div className="grid xl:grid-cols-2 gap-6 mt-8">



{/* Advisor */}


<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold mb-4">

🤖 AI Fleet Advisor

</h2>



{metrics.fleet_advisor && (

<ul className="space-y-3">

{
metrics.fleet_advisor.map(
(item,index)=>(

<li
key={index}
className="bg-slate-100 p-3 rounded-lg"
>

{item}

</li>

))
}

</ul>

)}



</div>







{/* AI Chat */}


<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold mb-4">

💬 AI Fleet Assistant

</h2>



<input

value={question}

onChange={
e=>setQuestion(e.target.value)
}

placeholder="Ask about fleet..."

className="w-full border rounded-lg p-3"

/>



<button

onClick={askAI}

className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"

>

{
loading
?
"Thinking..."
:
"Ask AI"
}

</button>





{
answer &&

<div className="mt-5 bg-slate-100 p-4 rounded-xl">


<p className="font-bold">
AI Response
</p>


<p className="mt-2">
{answer}
</p>


</div>

}



</div>



</div>





{/* Fleet Health */}


<div className="mt-8 bg-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold mb-4">

Fleet Health Overview

</h2>



<div className="w-full bg-gray-200 rounded-full h-4">


<div

className="bg-blue-600 h-4 rounded-full"

style={{
width:
`${metrics.avg_battery}%`
}}

/>


</div>



<p className="mt-3 text-gray-500">

Average fleet battery health

</p>


</div>



</div>

);

}