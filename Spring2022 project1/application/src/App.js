import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";

import Appbar from "./components/Appbar";

function App() {
  
  
  return (
    <div className="App">
      <Appbar />
      <div>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/signup" element={<RegistrationScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
