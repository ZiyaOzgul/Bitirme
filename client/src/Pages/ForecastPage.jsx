import React from "react";
import Notes from "../components/Notes";
import Forecast from "../components/Forecast";
import Plans from "../components/Plans";

const ForecastPage = () => {
  return (
    <div className="w-full flex items-center justify-start">
      <Notes />
      <Forecast />
      <Plans />
    </div>
  );
};

export default ForecastPage;
