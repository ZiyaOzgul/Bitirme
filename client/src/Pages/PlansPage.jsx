import React from "react";
import Notes from "../components/Notes";
import Plans from "../components/Plans";
import Forecast from "../components/Forecast";
import AllPlans from "../components/AllPlans";

const PlansPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <AllPlans />
    </div>
  );
};

export default PlansPage;
