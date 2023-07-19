import React from "react";
import {
  UilSetting,
  UilNotes,
  UilClipboardNotes,
  UilBrightness,
  UilMoon,
  UilCloudSun,
  UilHome,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, lightMod } from "../redux/plannerSlice/plannerSlice";
import { Link } from "react-router-dom";
const Nav = () => {
  const dispatch = useDispatch();
  const colorMod = useSelector(lightMod);
  const handleColor = (color) => {
    dispatch(changeTheme(color));
  };
  return (
    <nav
      className={`w-1/12 border h-full  flex flex-col  items-center justify-between py-4 ${
        colorMod === "dark"
          ? "text-white border-slate-950"
          : " text-blue-500 border-blue-500"
      }`}
    >
      <h1 className="relative md:font-bold text-4xl mt-12 flex items-end  space-x-1">
        <i className="text-blue-400">Dp</i>
        <p className="text-xs font-extralight">Daily Planner</p>
      </h1>
      {/* links */}

      <div className=" w-full flex items-center justify-center  flex-col space-y-4 md:space-y-12">
        <Link to={`/index`} className="w-5/6">
          <div
            className={`w-full flex items-center justify-start space-x-1 rounded-lg bg-slate-800 hover:bg-slate-700    transition-all ease-in-out duration-500 group `}
          >
            <UilHome className="w-10 h-10 p-1 group-hover:scale-105 group-hover:text-blue-500 transition-all ease-in-out  duration-500    "></UilHome>

            <p className="  group-hover:translate-x-3  px-3 py-2 transition-all ease-in-out duration-500 ">
              Home
            </p>
          </div>
        </Link>
        <Link to={`/plans`} className="w-5/6">
          <div
            className={`w-full flex items-center justify-start space-x-1 rounded-lg bg-slate-800 hover:bg-slate-700    transition-all ease-in-out duration-500 group `}
          >
            <UilClipboardNotes className="w-10 h-10 p-1 group-hover:scale-105 group-hover:text-blue-500 transition-all  ease-in-out duration-500"></UilClipboardNotes>

            <p className="  group-hover:translate-x-3  px-3 py-2 transition-all ease-in-out duration-500 ">
              Plans
            </p>
          </div>
        </Link>
        <Link to={`/notes`} className="w-5/6 ">
          <div
            className={`w-full flex items-center justify-start space-x-1 rounded-lg bg-slate-800 hover:bg-slate-700    transition-all ease-in-out duration-500 group `}
          >
            <UilNotes className="w-10 h-10 p-1 group-hover:scale-105 group-hover:text-blue-500 transition-all ease-in-out duration-500 "></UilNotes>

            <p className="  group-hover:translate-x-3  px-3 py-2 transition-all ease-in-out duration-500 ">
              Notes
            </p>
          </div>
        </Link>
        <Link to={`/forecast`} className="w-5/6">
          <div
            className={`w-full flex items-center justify-start space-x-1 rounded-lg bg-slate-800 hover:bg-slate-700    transition-all ease-in-out duration-500 group `}
          >
            <UilCloudSun className="w-10 h-10 p-1 group-hover:scale-105 group-hover:text-blue-500 transition-all ease-in-out duration-500 "></UilCloudSun>

            <p className="  group-hover:translate-x-2  px-3 py-2 transition-all ease-in-out duration-500 ">
              Weather
            </p>
          </div>
        </Link>

        {/* <div
          className={`w-5/6 flex items-center justify-start space-x-1 rounded-lg bg-slate-800 hover:bg-slate-700   transition-all ease-in-out duration-500 group `}
        >
          <UilSetting className="w-10 h-10 p-1 group-hover:scale-105 group-hover:text-blue-500 transition-all ease-in-out duration-500 "></UilSetting>
          <p className="  group-hover:translate-x-3  px-3 py-2 transition-all ease-in-out duration-500 ">
            Settings
          </p>
        </div> */}
      </div>
      <div className="w-5/6 flex items-center justify-between space-x-2   ">
        {/* <UilBrightness
          onClick={() => handleColor("light")}
          className={`cursor-pointer w-10 h-10 p-1 border-slate-900 bg-slate-700 rounded-lg hover:text-yellow-500 hover:bg-slate-200 hover:scale-105 ease-in-out duration-500 ${
            colorMod === "light" ? "border border-blue-500" : null
          } `}
        ></UilBrightness> */}
        <UilMoon
          onClick={() => handleColor("dark")}
          className={`cursor-pointer w-10 h-10 p-1 border-slate-900 bg-slate-700 rounded-lg hover:text-slate-950 hover:bg-slate-800 hover:scale-105 ease-in-out duration-500 ${
            colorMod === "dark" ? "border border-slate-950" : null
          }`}
        ></UilMoon>
      </div>
    </nav>
  );
};

export default Nav;
