import React from "react";
import { getDayfromUnix } from "../../utils";

const DayForecast = ({ dayForecast }) => (
  <div className="forecast">
    <div className="forecast__day">{getDayfromUnix(dayForecast.dt)}</div>
    <div className="forecast__icon">
      <img
        src={`http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`}
        style={{ height: "100%" }}
        alt="current weather icon"
      />
    </div>
    <div className="forecast__temp">{Math.round(dayForecast.main.temp)} °C</div>
  </div>
);

export default DayForecast;
