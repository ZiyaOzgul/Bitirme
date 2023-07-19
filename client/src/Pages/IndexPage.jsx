import React from "react";
import Notes from "../components/Notes";
import Plans from "../components/Plans";
import Forecast from "../components/Forecast";

const IndexPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <Notes />
      <Plans />
      <Forecast />
    </div>
  );
};

export default IndexPage;
