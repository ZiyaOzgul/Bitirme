import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  complatedPlans,
  currentlyPlans,
  daysStore,
  forecast,
  getPlansAsync,
  getWeatherData,
  plans,
  postPlansAsync,
} from "../redux/plannerSlice/plannerSlice";
import {
  UilTrashAlt,
  UilEditAlt,
  UilSpinner,
  UilPlus,
  UilCheck,
  UilPlay,
  UilTimesCircle,
  UilTimes,
  UilExclamationCircle,
} from "@iconscout/react-unicons";
import { useFormik } from "formik";
const AllPlans = () => {
  const [clock, setClock] = useState("");
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = useState("");
  const [dayName, setDayName] = useState("");
  const dayNames = useSelector(daysStore);
  const [addPlan, setAddPlan] = useState(false);
  const weatherData = useSelector(forecast);
  const allPlans = useSelector(plans);
  const currentMetric = useSelector((state) => state.planner.metric);
  const city = useSelector((state) => state.planner.defaultCity);
  const complated = useSelector(complatedPlans);
  const currently = useSelector(currentlyPlans);
  //
  useEffect(() => {
    dispatch(
      getWeatherData({
        cityName: city,
        metric: currentMetric,
      })
    );
    dispatch(getPlansAsync());
    setInterval(() => {
      const dateobj = new Date();
      setClock(dateobj.toLocaleTimeString());
    }, 1000);
    const date = new Date();
    let currentDate = `${date.getDate()}:${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }:${date.getFullYear()}`;
    setDayName(dayNames[date.getDay()]);
    setDateTime(currentDate);
  }, [dispatch]);
  //
  const formik = useFormik({
    initialValues: {
      planTitle: "",
      planBody: "",
      planLastDate: "",
    },
    onSubmit: (e) => {
      dispatch(
        postPlansAsync({
          title: e.planTitle,
          plan: e.planBody,
          planDate: e.planLastDate,
        })
      );
      setAddPlan(false);
      e.planBody = "";
      e.planLastDate = "";
      e.planTitle = "";
    },
  });
  //
  if (
    weatherData == "" ||
    weatherData == null ||
    allPlans == "" ||
    allPlans == null
  ) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <h1 className="font-bold text-6xl text-white">
          Loading
          <UilSpinner className="animate-spin w-10 h-10 inline-block"></UilSpinner>
        </h1>
      </div>
    );
  } else {
    return (
      <div className="relative overflow-y-scroll w-full h-screen px-1 flex items-center justify-start flex-col  text-white  ">
        <div
          className={`w-full h-1/7 flex items-center justify-between px-4 ${
            weatherData.main.temp.toFixed() > 10
              ? "bg-gradient-to-br from-orange-600 to-amber-600 shadow-lg rounded shadow-amber-600"
              : "bg-gradient-to-br from-cyan-700 to-blue-700 shadow-lg rounded shadow-blue-700"
          }`}
        >
          <h1 className="font-semibold text-2xl ">
            {dayName} | {dateTime}
            {/* {JSON.stringify(complated)} */}
          </h1>
          <h2 className="font-bold text-xl">{clock}</h2>
          <h3 className=" flex items-center font-bold text-xl">
            <UilExclamationCircle
              className={`${
                weatherData.main.temp.toFixed() >= 30 ||
                weatherData.main.temp.toFixed() <= 0
                  ? "inline"
                  : "hidden"
              } text-red-800 mr-2`}
            ></UilExclamationCircle>
            {weatherData.main.temp.toFixed()}{" "}
            {currentMetric !== "metric" ? "°F" : "°C"}
          </h3>
          <div className="py-1 flex items-center justify-center flex-col">
            <p className="font-medium text-lg">
              {weatherData.name}, {weatherData.sys.country}
            </p>
            <p className="font-normal text-xl">{weatherData.weather[0].main}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].main}
              className="w-10 h-10 hover:scale-110 duration-500 ease-in-out"
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start">
          <div className="w-full flex items-center justify-between md:pt-10 pl-20">
            <h1 className="font-semibold text-4xl">Planlarınız</h1>
            {/* <div className="group flex border border-white rounded hover:border-blue-500 duration-500 ease-in-out transition-all ">
              <p className=" font-medium text-lg  py-2 group-hover:text-blue-500 hover:scale-110 transition-all ease-in-out duration-500">
                Plan Ekle
              </p>
              <UilPlus className="w-10 h-10 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ease-in-out duration-500"></UilPlus>
            </div> */}
            <div
              className="flex items-center justify-center text-white space-x-2 group mr-4 border border-white rounded-lg p-2 cursor-pointer hover:border-blue-500 hover:scale-110 transition-all ease-in-out duration-500"
              onClick={() => setAddPlan(true)}
            >
              <p className="font-medium text-xl group-hover:text-blue-500 group-hover:scale-105 transition-all ease-in-out duration-500">
                Plan Ekle
              </p>
              <UilPlus className="w-10 h-10 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:scale-110 transition-all ease-in-out duration-500"></UilPlus>
            </div>
          </div>
          {/* planlar */}
          <div className="w-full h-full flex items-center justify-center ">
            {/* devam eden planlar */}
            <div className="w-1/3 h-full flex flex-col items-center justify-start md:mt-20 space-y-6 px-1 ">
              <h1 className="w-full font-medium text-lg border-b border-b-amber-600 py-1 px-2 mx-1">
                Devam Eden Planlar
              </h1>
              {currently == "" ? (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <h1 className="text-4xl font-medium text-white">
                    Devam Eden Planınız Yoktur
                  </h1>
                </div>
              ) : (
                currently.map((currentplan) => (
                  <div className="w-11/12 h-80  bg-slate-800 border-2 rounded-3xl border-yellow-900 relative group flex items-center justify-around flex-col shadow shadow-slate-700 hover:bg-slate-700  transition-all ease-in-out duration-500">
                    <div className="absolute top-0 w-full flex items-center justify-between bg-amber-600 bg-opacity-30 rounded-3xl ">
                      <h1 className="font-light text-lg px-3 py-1 text-amber-500">
                        Yapılıyor
                      </h1>
                      <UilPlay className="w-12 h-10 px-3 py-1 text-yellow-700"></UilPlay>
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
                ))
              )}
            </div>
            {/* zamanında tamamlanamamış */}
            <div className="w-1/3 h-full flex flex-col items-center justify-start  md:mt-20 space-y-6 px-1">
              <h1 className="w-full font-medium text-lg border-b border-b-red-600 py-1 px-2">
                Süresi Geçen Planlar
              </h1>
              <div className="w-11/12 h-80 bg-slate-800 border-2 rounded-3xl border-red-900 relative group flex items-center justify-around flex-col shadow shadow-slate-700 hover:bg-slate-700  transition-all ease-in-out duration-500">
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
            </div>
            {/* tamamlanmış planlar  */}
            <div className="w-1/3 h-full flex flex-col items-center justify-start  md:mt-20 space-y-6 px-1">
              <h1 className="w-full font-medium text-lg border-b border-b-emerald-600 py-1 px-2">
                Tamamlanmış Planlar
              </h1>
              {complated == "" ? (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <h1 className="text-4xl font-medium text-white">
                    Tamamlanmış Planınız Yoktur
                  </h1>
                </div>
              ) : (
                complated.map((item) => (
                  <div className="w-11/12 h-80 bg-slate-800 border-2 rounded-3xl shadow shadow-emerald-900 border-emerald-900 relative group flex items-center justify-around flex-col hover:bg-slate-700  transition-all ease-in-out duration-500 ">
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
                ))
              )}
            </div>
          </div>
        </div>

        {/* add note modal */}
        <div
          className={`fixed top-0 right-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 ${
            addPlan ? "block" : "hidden"
          } `}
        >
          <form
            className="relative text-white rounded-2xl p-4 w-1/3 h-auto flex flex-col items-center justify-center border border-slate-600 shadow shadow-slate-400 bg-gradient-to-br from-slate-800 to-gray-800"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="font-medium text-4xl px-2 my-4">Planınızı Girin</h1>
            <label
              className="w-2/3 text-lg font-medium py-2"
              htmlFor="planTitle"
            >
              Plan Başlığı
            </label>
            <input
              type="text"
              className="font-medium text-lg px-4 py-3 w-2/3 rounded-2xl outline-none border border-gray-400 bg-slate-600 hover:bg-slate-800 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 cursor-pointer"
              name="planTitle"
              id="planTitle"
              placeholder="Bugün Yapılacak..."
              onChange={formik.handleChange}
              value={formik.values.planTitle}
              required
            />
            <label
              className="w-2/3 text-lg font-medium mt-6 mb-3"
              htmlFor="planBody"
            >
              Planınız
            </label>
            <textarea
              name="planBody"
              id="planBody"
              cols="30"
              rows="10"
              className="font-medium text-lg px-4 py-3 w-2/3 rounded-2xl outline-none border border-gray-400 bg-slate-600 hover:bg-slate-800 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 cursor-pointer"
              placeholder="Bugünün Planı..."
              onChange={formik.handleChange}
              value={formik.values.planBody}
              required
            ></textarea>
            <label
              className="w-2/3 text-lg font-medium mt-6 mb-3"
              htmlFor="planLastDate"
            >
              Kalan Zaman
            </label>
            <input
              className="font-medium text-lg px-4 py-3 w-2/3 rounded-2xl outline-none border border-gray-400 bg-slate-600 hover:bg-slate-800 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 cursor-pointer"
              type="time"
              // min={clock}
              name="planLastDate"
              id="planLastDate"
              placeholder="Plan Bitiş"
              onChange={formik.handleChange}
              value={formik.values.planLastDate}
              required
            />
            <button
              type="submit"
              className="px-3 py-2 my-4 rounded-xl border-gray-400 bg-slate-500 hover:text-blue-500 hover:scale-110 hover:bg-slate-700 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 flex items-center group"
            >
              Kaydet
              <UilCheck className="w-8 h-8 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:scale-110 transition-all ease-in-out duration-500"></UilCheck>
            </button>
            <UilTimesCircle
              className=" text-red-500 absolute top-4 right-4 w-8 h-8 hover:text-red-600  hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
              onClick={() => {
                formik.values.planBody = "";
                formik.values.planTitle = "";
                formik.values.planLastDate = "";
                setAddPlan(false);
              }}
            ></UilTimesCircle>
          </form>
        </div>
      </div>
    );
  }
};

export default AllPlans;
