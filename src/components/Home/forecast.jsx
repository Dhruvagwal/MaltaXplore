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
    <div className="p-8 ">
      <ul>
        {typeof weather.main != "undefined" ? (
          <div>
            <li className="">
              <p>
                {weather.name}, {weather.sys.country}
              </p>
              <p className="flex text-7xl">
                {props.data.temperatureC}°<span>C</span>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </p>
            </li>
            <br />
            <li>
              Temperature{" "}
              <span className="temp">
                {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
              </span>
            </li>
            <li>
              Humidity{" "}
              <span className="temp">{Math.round(weather.main.humidity)}%</span>
            </li>
            <li>
              Visibility{" "}
              <span className="temp">{Math.round(weather.visibility)} mi</span>
            </li>
            <li>
              Wind Speed{" "}
              <span className="temp">
                {Math.round(weather.wind.speed)} Km/h
              </span>
            </li>
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
