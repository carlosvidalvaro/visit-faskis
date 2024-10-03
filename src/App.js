import React from "react";
import Map from "./components/Map";
import "./App.css";
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
    <div>
      <h1>VISIT FASKIS!</h1>
      <Map />
    </div>
  );
};

export default App;
