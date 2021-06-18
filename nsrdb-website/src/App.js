import React, { useState } from "react";
import Map from "./components/map";
import SideContent from "./components/sideContent/sidecontent";
import InfoCard from "./components/infocard";
import GenerationForm from "./components/generation/generationform";

function App() {
  const [selectedCoord, setSelectedCoord] = useState([0, 0]);
  const [year, setYear] = useState(2019);
  const [variable, setVariable] = useState("GHI");
  const [variableLimits, setvariableLimits] = useState([0, 0]);
  const [content, setContent] = useState(0);
  const [reloadMap, setReloadMap] = useState(false);

  const handleCoordChange = (newValue) => {
    setSelectedCoord(newValue);
  };

  const handleYearChange = (year) => {
    setYear(year);
  };

  const handleVariableChange = (variable) => {
    setVariable(variable);
  };

  const handleVariableLimitsChange = (variableLimits) => {
    setvariableLimits(variableLimits);
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleReloadMap = (reload) => {
    setReloadMap(reload);
  };

  return (
    <div>
      {content === 0 ? (
        <SideContent coord={selectedCoord} year={year} variable={variable} />
      ) : (
        <GenerationForm coord={selectedCoord} year={year} variable={variable} />
      )}
      <InfoCard
        coord={selectedCoord}
        onCoordChange={handleCoordChange}
        year={year}
        variable={variable}
        variableLimits={variableLimits}
        content={content}
        reloadMap={reloadMap}
        onYearChange={handleYearChange}
        onVariableChange={handleVariableChange}
        onContentChange={handleContentChange}
        onReloadMap={handleReloadMap}
      />
      <Map
        coord={selectedCoord}
        onCoordChange={handleCoordChange}
        year={year}
        variable={variable}
        variableLimits={variableLimits}
        reloadMap={reloadMap}
        onYearChange={handleYearChange}
        onVariableChange={handleVariableChange}
        onVariableLimitsChange={handleVariableLimitsChange}
      />
    </div>
  );
}

export default App;
