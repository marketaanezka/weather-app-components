import React, { useState, useEffect } from "react";
import { getTimefromUnix, filterForecast, getDayfromUnix } from "./utils";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_ID;
const API_URL = process.env.REACT_APP_API_URL;
const buttons = ["Prague", "Tenerife", "Yakutsk", "London"];

const fetchCurrentWeather = (setState, city) => {
  fetch(
    `${API_URL}data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log("fetched", data);
        setState(data);
      });
    } else {
      console.log(response);
    }
  });
};

const fetchWeatherForecast = (setState, city) => {
  fetch(
    `${API_URL}data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log(filterForecast(data.list));
        setState(filterForecast(data.list));
      });
    } else {
      console.log(response);
    }
  });
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("Brno");

  const handleButtonClick = (value) => {
    setCity(value);
    console.log(city);
  };

  useEffect(() => {
    fetchCurrentWeather(setWeather, city);
    fetchWeatherForecast(setForecast, city);
  }, [city]);

  return (
    <div className="App">
      <div className="container">
        <h1>My Weather App</h1>

        <div className="button-group">
          {buttons.map((buttonValue) => {
            return (
              <button
                className="button"
                onClick={() => handleButtonClick(buttonValue)}
                key={buttonValue}
              >
                {buttonValue}
              </button>
            );
          })}
        </div>

        <div className="weather">
          {weather !== null && weather !== undefined ? (
            <div className="weather__current">
              <h2 className="weather__city" id="mesto">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="weather__inner weather__inner--center">
                <div className="weather__section weather__section--temp">
                  <span className="weather__temp-value" id="teplota">
                    {Math.round(weather.main.temp)}
                  </span>
                  <span className="weather__temp-unit">°C</span>
                  <div className="weather__description" id="popis">
                    {weather.weather[0].main}
                  </div>
                </div>
                <div
                  className="weather__section weather__section--icon"
                  id="ikona"
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="current weather icon"
                  />
                </div>
              </div>
              <div className="weather__inner">
                <div className="weather__section">
                  <h3 className="weather__title">Wind</h3>
                  <div className="weather__value">
                    <span id="wind">{weather.wind.speed}</span> km/h
                  </div>
                </div>
                <div className="weather__section">
                  <h3 className="weather__title">Humidity</h3>
                  <div className="weather__value">
                    <span id="humidity">{weather.main.humidity}</span> %
                  </div>
                </div>
              </div>
              <div className="weather__inner">
                <div className="weather__section">
                  <h3 className="weather__title">Sunrise</h3>
                  <div className="weather__value">
                    <span id="sunrise">
                      {getTimefromUnix(weather.sys.sunrise)}
                    </span>
                  </div>
                </div>
                <div className="weather__section">
                  <h3 className="weather__title">Sunset</h3>
                  <div className="weather__value">
                    <span id="sunset">
                      {getTimefromUnix(weather.sys.sunset)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="weather__forecast" id="predpoved">
            {forecast !== null && forecast !== undefined ? (
              <div className="forecast">
                <div className="forecast__day">
                  {getDayfromUnix(forecast[0].dt)}
                </div>
                <div className="forecast__icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`}
                    style={{ height: "100%" }}
                    alt="current weather icon"
                  />
                </div>
                <div className="forecast__temp">
                  {Math.round(forecast[0].main.temp)} °C
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
