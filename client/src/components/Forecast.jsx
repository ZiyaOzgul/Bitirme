import React, { useEffect, useState } from "react";
import { UilTemperatureHalf, UilTear, UilWind } from "@iconscout/react-unicons";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  forecast,
  getWeatherAsync,
  getWeatherData,
} from "../redux/plannerSlice/plannerSlice";

const Forecast = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.planner.defaultCity);
  const currentMetric = useSelector((state) => state.planner.metric);
  const [clock, setClock] = useState("");
  const [DayName, setDayName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const dayNames = useSelector(daysStore);

  useEffect(() => {
    dispatch(
      getWeatherData({
        cityName: city,
        metric: currentMetric,
      })
    );
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
  }, [dispatch, city, currentMetric]);
  const forecastData = useSelector(forecast);
  const isLoading = useSelector((state) => state.planner.isLoadingForecast);

  if (forecastData == "") {
    <div className="w-1/3 h-screen flex items-center justify-center">
      <h1 className="font-bold text-white text-4xl">Loading ...</h1>
    </div>;
  } else {
    return (
      <div className="w-1/3 h-screen flex items-start justify-center flex-col">
        <h1 className="w-full text-center border-b border-b-blue-500 text-white px-4 py-2 font-semibold text-lg">
          Today's Forcast
        </h1>
        <div className="w-11/12 flex flex-col items-end justify-start mx-1 mt-4 text-white bg-gradient-to-br from-blue-900 to bg-sky-900 rounded-3xl shadow shadow-blue-900">
          <div className="w-full flex items-center justify-center mt-5">
            <p className="text-lg font-semibold border-r border-r-white px-2">
              {DayName} | {dateTime}
            </p>
            <p className="text-xl font-bold ml-2 "> {clock} </p>
          </div>
          <div className="w-full flex items-center justify-center mt-4">
            <p className="font-semibold text-lg">
              {forecastData.name}, {forecastData.sys.country}
            </p>
          </div>
          <div className="w-full h-40 flex items-center justify-center ">
            <h1 className="font-bold text-6xl">
              {forecastData.main.temp.toFixed()}
              {currentMetric !== "metric" ? "°F" : "°C"}
            </h1>
          </div>
          <div className="w-full flex flex-col items-center justify-start space-y-2">
            <p className="font-light text-base opacity-75">
              {forecastData.weather[0].main}
            </p>
            <p className="font-extralight text-base opacity-75">
              {forecastData.weather[0].description}
            </p>
          </div>
          <div className="w-full flex items-center justify-between space-x-4 mt-2">
            <img
              src="https://openweathermap.org/img/wn/04n@2x.png"
              alt="Weather"
              className="w-1/3 px-2"
            />
            <div className="w-1/2 px-2 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-1">
                <UilTemperatureHalf></UilTemperatureHalf>
                <p className="font-light text-sm">
                  Real Feel:{" "}
                  <i>
                    {forecastData.main.feels_like.toFixed()}
                    {currentMetric !== "metric" ? "°F" : "°C"}
                  </i>
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <UilTear></UilTear>
                <p className="font-light text-sm">
                  Humidity : <i>{forecastData.main.humidity} %</i>
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <UilWind></UilWind>
                <p className="font-light text-sm">
                  Wind : <i>{forecastData.wind.speed.toFixed()} km/h</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Forecast;
