import { filterForecast } from "../utils";

const API_KEY = process.env.REACT_APP_API_ID;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchCurrentWeather = (setState, city) => {
  fetch(
    `${API_URL}data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        setState(data);
      });
    } else {
      console.log(response);
    }
  });
};

export const fetchWeatherForecast = (setState, city) => {
  fetch(
    `${API_URL}data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        setState(filterForecast(data.list));
      });
    } else {
      console.log(response);
    }
  });
};
