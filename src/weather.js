import {
  changeInfo,
  displayError,
  removeError,
  changeDate,
  changeWeatherInfo,
} from "./interface.js";

const API_KEY = "226dbf12f6c9f3e021556ea66e7c95c9";

async function getCityData(API) {
  const response = await fetch(API, { mode: "cors" });
  const cityData = await response.json();
  if (!cityData.length) {
    displayError();
  } else {
    const { name, country, lat, lon } = cityData[0];
    changeInfo(name, country);
    removeError();
    getWeatherData(lat, lon, API_KEY);
  }
}

async function getWeatherData(latency, longitude, API) {
  const FORECAST_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${latency}&lon=${longitude}&appid=${API}&units=metric`;
  const response = await fetch(FORECAST_API, { mode: "cors" });
  const weatherData = await response.json();
  filterForecastData(weatherData);
}

function filterForecastData(data) {
  changeDate(data.list[0].dt_txt);
  changeWeatherInfo(data);
  console.log(data);
  let uniqueForecastDays = [];
  const sevenForecastDays = data.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqueForecastDays.includes(forecastDate)) {
      return uniqueForecastDays.push(forecastDate);
    }
  });
}

export { getCityData, API_KEY };
