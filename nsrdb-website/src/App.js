import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import mapboxgl from "mapbox-gl";
import Map from "./components/map";
import SideContent from "./components/sidecontent";
import InfoCard from "./components/infocard";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmRpYXo5OCIsImEiOiJja2hsOXplNnYxNDRrMnRuMjU0Z2JsOHUxIn0.To4YKhzB_9tGdI-eSxuPcw";

function App() {
  const [selectedCoord, setSelectedCoord] = useState([0, 0]);
  const [year, setYear] = useState(2018);
  const [variable, setVariable] = useState("GHI");

  const handleCoordChange = (newValue) => {
    setSelectedCoord(newValue);
  };

  const handleYearChange = (year) => {
    setYear(year);
  };

  const handleVariableChange = (variable) => {
    setVariable(variable);
  };

  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={4}>
          <SideContent coord={selectedCoord} year={year} variable={variable} />
        </Grid>
        <Grid item xs={8}>
          <Map
            coord={selectedCoord}
            onCoordChange={handleCoordChange}
            year={year}
            variable={variable}
            onYearChange={handleYearChange}
            onVariableChange={handleVariableChange}
          />
        </Grid>
      </Grid>
      <InfoCard
        coord={selectedCoord}
        onCoordChange={handleCoordChange}
        year={year}
        variable={variable}
        onYearChange={handleYearChange}
        onVariableChange={handleVariableChange}
      />
    </div>
  );
}

export default App;
