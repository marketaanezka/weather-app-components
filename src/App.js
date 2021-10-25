import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_ID;
// console.log(API_KEY); // currently returns undefined not sure why

const fetchCurrentWeather = (setState) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Prague&units=metric&APPID=60990aef3d3c4f5a36b9de246444ca2f`
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

const App = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchCurrentWeather(setWeather);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>My Weather App</h1>
        <div className="weather">
          <div className="weather__current">
            <h2 className="weather__city" id="mesto">
              Prague, CZ
            </h2>
            <div className="weather__inner weather__inner--center">
              <div className="weather__section weather__section--temp">
                <span className="weather__temp-value" id="teplota">
                  --
                </span>
                <span className="weather__temp-unit">°C</span>
                <div className="weather__description" id="popis">
                  --
                </div>
              </div>
              <div
                className="weather__section weather__section--icon"
                id="ikona"
              >
                --
                {/* <img
                  src={URL FROM OPEN WEATHER}
                  alt="current weather icon"
                /> */}
              </div>
            </div>
            <div className="weather__inner">
              <div className="weather__section">
                <h3 className="weather__title">Wind</h3>
                <div className="weather__value">
                  <span id="vitr">--</span> km/h
                </div>
              </div>
              <div className="weather__section">
                <h3 className="weather__title">Humidity</h3>
                <div className="weather__value">
                  <span id="vlhkost">--</span> %
                </div>
              </div>
            </div>
            <div className="weather__inner">
              <div className="weather__section">
                <h3 className="weather__title">Sunrise</h3>
                <div className="weather__value">
                  <span id="vychod">--</span>
                </div>
              </div>
              <div className="weather__section">
                <h3 className="weather__title">Sunset</h3>
                <div className="weather__value">
                  <span id="zapad">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
