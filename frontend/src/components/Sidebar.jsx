import { NavLink } from "react-router-dom";


export default function Sidebar() {


  const menu = [

    {
      name: "Dashboard",
      path: "/",
      icon: "📊"
    },

    {
      name: "Vehicles",
      path: "/vehicles",
      icon: "🚗"
    },

    {
      name: "Trips",
      path: "/trips",
      icon: "🛣️"
    },

    {
      name: "Results",
      path: "/results",
      icon: "📈"
    },

    {
      name: "Simulator",
      path: "/simulator",
      icon: "⚡"
    },

    {
      name: "Fleet Health",
      path: "/fleet-health",
      icon: "❤️"
    },

    {
      name: "Charging Engine",
      path: "/charging",
      icon: "🔋"
    },

    {
      name: "Predictive Maintenance",
      path: "/maintenance",
      icon: "🛠️"
    }

  ];



  return (

    <aside
      className="
      w-72
      min-h-screen
      bg-gradient-to-b
      from-slate-950
      to-slate-800
      text-white
      p-6
      shadow-xl
      "
    >


      {/* Brand */}

      <div className="mb-10">

        <h1 className="
        text-3xl
        font-bold
        tracking-wide
        ">
          ⚡ ChargePilot
        </h1>


        <p className="
        text-sm
        text-slate-400
        mt-2
        ">
          AI Fleet Management
        </p>


      </div>





      {/* Navigation */}

      <nav className="space-y-3">


        {
          menu.map((item)=>(


            <NavLink

              key={item.path}

              to={item.path}

              className={({isActive}) =>

                `
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300

                ${
                  isActive

                  ?

                  "bg-blue-600 shadow-lg shadow-blue-500/30 scale-105"

                  :

                  "hover:bg-slate-700 hover:translate-x-2"
                }

                `
              }

            >


              <span className="text-xl">

                {item.icon}

              </span>



              <span className="font-medium">

                {item.name}

              </span>



            </NavLink>


          ))
        }


      </nav>





      {/* System Status */}

      <div
        className="
        mt-12
        bg-slate-700/50
        rounded-xl
        p-4
        "
      >

        <p className="text-sm text-slate-300">

          System Status

        </p>


        <div className="
        flex
        items-center
        gap-2
        mt-3
        ">


          <div
            className="
            w-3
            h-3
            bg-green-400
            rounded-full
            animate-pulse
            "
          />


          <span className="text-green-300">

            AI Online

          </span>


        </div>


      </div>



    </aside>

  );

}