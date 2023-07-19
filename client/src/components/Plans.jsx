import React, { useEffect } from "react";
import { UilTimes, UilCheck, UilPlay } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getPlansAsync, plans } from "../redux/plannerSlice/plannerSlice";
const Plans = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.planner.isLoadingPlans);
  const Plans = useSelector(plans);
  useEffect(() => {
    dispatch(getPlansAsync());
  }, [dispatch]);

  if (Plans == "") {
    <div className="w-1/3 h-screen flex items-center justify-center">
      <h1 className="font-bold text-white text-4xl">Loading ...</h1>
    </div>;
  } else {
    return (
      <div className="w-1/3 h-screen overflow-y-auto  flex flex-col justify-start  items-center space-y-4 relative text-white ">
        <h1 className="w-full text-white px-4 py-2 border-b border-b-blue-500 font-semibold text-lg">
          Plans
        </h1>
        <div className="w-11/12 h-1/3 bg-slate-800 border-2 rounded-3xl shadow shadow-emerald-900 border-emerald-900 relative group flex items-center justify-around flex-col hover:bg-slate-700  transition-all ease-in-out duration-500 ">
          <div className="absolute top-0 w-full flex items-center justify-between bg-emerald-900 bg-opacity-30 rounded-3xl ">
            <h1 className="font-light text-lg px-3 py-1 text-sky-500">
              Tamamlanmadı
            </h1>
            <UilCheck className="w-12 h-10 px-3 py-1 text-green-700"></UilCheck>
          </div>
          <h1 className=" px-1 py-2 mt-4 font-bold text-lg drop-shadow-xl">
            React Öğren
          </h1>
          <p className="font-medium text-sm">React öğrenmelisin</p>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-center justify-start ml-4">
              <p className="font-medium text-sm">
                Tamamlanması Gereken Zaman :
              </p>
              <i> 22.06.2023</i>
            </div>
            <div className="flex flex-col items-center justify-start mr-4">
              <p className="font-medium text-sm">Kalan Zaman:</p>
              <i>1 Gün</i>
            </div>
          </div>
        </div>
        <div className="w-11/12 h-1/3 bg-slate-800 border-2 rounded-3xl border-red-900 relative group flex items-center justify-around flex-col shadow shadow-slate-700 hover:bg-slate-700  transition-all ease-in-out duration-500">
          <div className="absolute top-0 w-full flex items-center justify-between bg-rose-600 bg-opacity-30 rounded-3xl ">
            <h1 className="font-light text-lg px-3 py-1 text-red-500">
              Süresi Geçti
            </h1>
            <UilTimes className="w-12 h-10 px-3 py-1 text-red-700"></UilTimes>
          </div>

          <h1 className="mt-4 px-1 py-2 font-bold text-lg drop-shadow-xl">
            React Öğren
          </h1>
          <p className="font-medium text-sm">React öğrenmelisin</p>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-center justify-start ml-4">
              <p className="font-medium text-sm">
                Tamamlanması Gereken Zaman :
              </p>
              <i> 22.06.2023</i>
            </div>
            <div className="flex flex-col items-center justify-start mr-4">
              <p className="font-medium text-sm">Kalan Zaman:</p>
              <i>1 Gün</i>
            </div>
          </div>
        </div>
        <div className="w-11/12 h-1/3 bg-slate-800 border-2 rounded-3xl border-yellow-900 relative group flex items-center justify-around flex-col shadow shadow-slate-700 hover:bg-slate-700  transition-all ease-in-out duration-500">
          {/* Tamamlanıyor */}

          <div className="absolute top-0 w-full flex items-center justify-between bg-amber-600 bg-opacity-30 rounded-3xl ">
            <h1 className="font-light text-lg px-3 py-1 text-amber-500">
              Yapılıyor
            </h1>
            <UilPlay className="w-12 h-10 px-3 py-1 text-yellow-700"></UilPlay>
          </div>

          {/* tamamlandı */}

          <h1 className="mt-4 px-1 py-2 font-bold text-lg drop-shadow-xl">
            React Öğren
          </h1>
          <p className="font-medium text-sm">React öğrenmelisin</p>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-center justify-start ml-4">
              <p className="font-medium text-sm">
                Tamamlanması Gereken Zaman :
              </p>
              <i> 22.06.2023</i>
            </div>
            <div className="flex flex-col items-center justify-start mr-4">
              <p className="font-medium text-sm">Kalan Zaman:</p>
              <i>1 Gün</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Plans;
