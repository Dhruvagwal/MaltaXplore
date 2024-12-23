import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

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
    <div className="p-8 bg-red-400 mt-4 rounded-3xl">
      <ul>
        {typeof weather.main != "undefined" ? (
          <div className="text-white">
            <div className="flex justify-evenly">
              <img
                className="object-cover bg-white border rounded-full h-16"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              />
              <p className="flex text-7xl">
                {props.data.temperatureC}°<span>C</span>
              </p>
            </div>
            <br/>
            <hr />
            <br/>
            <div className="flex justify-evenly">
              <li>
                <span className="temp text-3xl">
                  {Math.round(weather.main.humidity)}%
                </span>
                <br />
                Humidity{" "}
              </li>
              <li>
                <span className="temp text-3xl">
                  {Math.round(weather.main.humidity)}%
                </span>
                <br />
                Humidity{" "}
              </li>
              <li>
                <span className="temp text-3xl">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
                <br />
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
