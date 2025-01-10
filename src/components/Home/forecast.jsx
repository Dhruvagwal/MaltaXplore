import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { Umbrella, Droplets, Wind } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  useEffect(() => {
    search("valleta");
  }, []);

  return (
    <div className="p-6 bg-red-400 mt-2 rounded-3xl">
      <ul>
        {typeof weather.main != "undefined" ? (
          <div className="text-white">
            <div className="flex justify-evenly">
              <img
                className="object-cover bg-white border rounded-full h-11 md:h-16"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              />
              <p className="flex text-5xl md:text-7xl">
                {props.data.temperatureC}°<span>C</span>
              </p>
            </div>
            <Separator className="my-2"/>
            <div className="flex flex-col md:flex-row justify-evenly max-md:space-y-4">
              <li className="flex flex-col items-center space-y-1">
                <Umbrella />
                <span className="temp text-xl md:text-2xl pb-1">
                  {weather.rain ? Math.round(weather.rain["1h"]) : 0}%
                </span>
                
                Precipitation
              </li>
              <li className="flex flex-col items-center space-y-1">
                <Droplets />
                <span className="temp text-xl md:text-2xl pb-1">
                  {Math.round(weather.main.humidity)}%
                </span>
                Humidity{" "}
              </li>
              <li className="flex flex-col items-center space-y-1">
                <Wind />
                <span className="temp text-xl md:text-2xl pb-1">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
                Wind Speed{" "}
              </li>
            </div>
          </div>
        ) : (
          <li>
            {error.query} {error.message}
          </li>
        )}
      </ul>
    </div>
  );
}
export default Forcast;
