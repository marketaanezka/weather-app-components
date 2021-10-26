import React, { useState, useEffect } from "react";
import { filterForecast } from "./utils";
import { cities } from "./utils/cities";
import Button from "./components/Button";
import CurrentWeather from "./components/CurrentWeather";
import DayForecast from "./components/DayForecast";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_ID;
const API_URL = process.env.REACT_APP_API_URL;

const buttons = ["Prague", "Tenerife", "Yakutsk"];

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
  const [city, setCity] = useState("Prague");

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
              <Button
                key={buttonValue}
                value={buttonValue}
                handleClick={() => handleButtonClick(buttonValue)}
              />
            );
          })}
        </div>

        <div className="select-wrapper">
          <select
            className="select"
            name="cityselect"
            id="cityselect"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            {cities.map((listedCity) => (
              <option value={listedCity}>{listedCity}</option>
            ))}
          </select>
        </div>

        <div className="weather">
          {weather !== null && weather !== undefined ? (
            <CurrentWeather weather={weather} />
          ) : null}

          <div className="weather__forecast" id="predpoved">
            {forecast !== null && forecast !== undefined
              ? forecast.map((dayForecast) => (
                  <DayForecast key={dayForecast.dt} dayForecast={dayForecast} />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
