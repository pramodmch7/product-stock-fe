import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import RPViewM from "./Components/RawProduct/RPViewM";
import RProductAEM from "./Components/RawProduct/RProductAEM";
import FPView from "./Components/FinalProduct/FPView";
import PPView from "./Components/ProcessProduct/PPView";

import NavBar from "./Components/NavBar";

import FProductAEM from "./Components/FinalProduct/FProductAEM";
import FProductEM from "./Components/FinalProduct/FProductEM";
import VNDashboard from "./Components/Dashboard/VNDashboard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<VNDashboard />} />
        <Route path="/rp" exact element={<RPViewM />} />
        <Route path="/rp/add" exact element={<RProductAEM />} />
        <Route path="/rp/update" exact element={<RProductAEM />} />
        <Route path="/fp" exact element={<FPView />} />
        <Route path="/fp/add" exact element={<FProductAEM />} />
        <Route path="/fp/update" exact element={<FProductEM />} />
        <Route path="/vpp" exact element={<PPView />} />
        <Route path="/dashboard" exact element={<VNDashboard />} />
      </Routes>
    </>
  );
}

export default App;
