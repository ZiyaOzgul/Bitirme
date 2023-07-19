import React from "react";
import Notes from "./Notes";
import Plans from "./Plans";
import Forecast from "./Forecast";

const Index = () => {
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <Notes />
      <Plans />
      <Forecast />
    </div>
  );
};

export default Index;
