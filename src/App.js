import React, { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchWeatherForecast } from "./api";
import Button from "./components/Button";
import Select from "./components/Select";
import CurrentWeather from "./components/CurrentWeather";
import DayForecast from "./components/DayForecast";
import "./App.css";

const buttons = ["Prague", "Tenerife", "Yakutsk"];

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
          <Select value={city} handleChangeCity={setCity} />
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
