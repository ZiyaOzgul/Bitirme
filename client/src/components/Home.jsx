import React from "react";
import {
  UilNotes,
  UilClipboardNotes,
  UilCloudSun,
} from "@iconscout/react-unicons";
const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center  ">
      <h1 className="  font-bold text-4xl text-blue-400 mt-10 ">
        Gününüzü Planlayın
      </h1>
      <div className="w-full h-full flex items-center justify-center px-4 space-x-6  ">
        <div className=" w-1/3 h-1/2 border rounded-3xl border-slate-900 bg-slate-700 text-white flex flex-col items-center justify-around ">
          <h1 className="font-semibold text-xl px-2  mt-4 py-2 text-center w-full border-b border-slate-900">
            Kolay Planlama
          </h1>
          <div className="w-full flex items-center justify-between px-4">
            <p className="font-medium text-lg py-1">Günüzü Planlayın</p>
            <UilClipboardNotes className="w-20 h-20 p-1 hover:scale-110 hover:text-blue-600 transition-all ease-in-out duration-500"></UilClipboardNotes>
          </div>
          <div className="w-full flex items-center justify-between px-4  ">
            <p className="font-medium text-lg py-1">
              Yarın Için Notlarınızı Alın
            </p>
            <UilNotes className="w-20 h-20 p-1 hover:scale-110 hover:text-blue-600 transition-all ease-in-out duration-500"></UilNotes>
          </div>
          <div className="w-full flex items-center justify-between px-4">
            <p className="font-medium text-lg py-1">Günün Hava Durumu</p>
            <UilCloudSun
              className={`w-20 h-20 p-1 hover:scale-110 hover:text-blue-600 transition-all ease-in-out duration-500`}
            ></UilCloudSun>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
