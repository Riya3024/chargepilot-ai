import {useState} from "react";
import API from "../services/api";


export default function FleetAssistant(){


const [question,setQuestion]=useState("");

const [answer,setAnswer]=useState("");

const [loading,setLoading]=useState(false);



const askAI = async()=>{

try{

setLoading(true);


const res = await API.post(
"/chat",
{
question,

fleet:{
avg_risk:30,

total_trips:120,

vehicles:[

{
name:"EV-01",
battery:80
},

{
name:"EV-02",
battery:25
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

<div className="bg-white rounded-2xl shadow p-6 mt-8">


<h2 className="text-2xl font-bold mb-4">

🤖 AI Fleet Assistant

</h2>



<input

className="border rounded-lg w-full p-3"

placeholder="Ask about your fleet..."

value={question}

onChange={
e=>setQuestion(e.target.value)
}

/>



<button

onClick={askAI}

className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg"

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

<div className="mt-5 bg-slate-100 p-4 rounded-lg">


<p className="font-medium">
AI Response:
</p>


<p className="mt-2">
{answer}
</p>


</div>

}


</div>

)

}