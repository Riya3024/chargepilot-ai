import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import Trips from "../pages/Trips";
import Results from "../pages/Results";
import Simulator from "../pages/Simulator";

import FleetHealth from "../pages/FleetHealth";
import Charging from "../pages/Charging";

import FleetAdvisor from "../pages/FleetAdvisor";

import Maintenance from "../pages/Maintenance";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/results" element={<Results />} />
      <Route path="/simulator" element={<Simulator />} />
     
<Route
  path="/fleet-health"
  element={<FleetHealth />}
/>
      
      <Route
  path="/charging"
  element={<Charging />}

/>
<Route
  path="/fleet-advisor"
  element={<FleetAdvisor />}
/>


<Route
path="/maintenance"
element={<Maintenance />}
/>
    </Routes>

    
  );
}