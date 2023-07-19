import React from "react";
import Notes from "../components/Notes";
import Plans from "../components/Plans";
import Forecast from "../components/Forecast";
import AllNotes from "../components/AllNotes";

const NotePage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <AllNotes />
    </div>
  );
};

export default NotePage;
