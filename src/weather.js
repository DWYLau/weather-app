import {
  changeInfo,
  displayError,
  displayUserError,
  removeError,
  changeDate,
  changeWeatherInfo,
  createCards,
  clearCards,
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

async function getWeatherData(latitude, longitude, API) {
  const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast/?lat=${latitude}&lon=${longitude}&appid=${API}&units=metric`;
  const response = await fetch(FORECAST_API, { mode: "cors" });
  const weatherData = await response.json();
  filterForecastData(weatherData);
}

function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
      fetch(REVERSE_GEOCODING_URL)
        .then((response) => response.json())
        .then((data) => {
          const { name, country, lat, lon } = data[0];
          changeInfo(name, country);
          getWeatherData(lat, lon, API_KEY);
        })
        .catch(() => {
          displayError();
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        displayUserError();
      }
    }
  );
}

function filterForecastData(data) {
  changeDate(data.list[0].dt_txt);
  changeWeatherInfo(data);
  let uniqueForecastDays = [];
  let sevenForecastDays = data.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqueForecastDays.includes(forecastDate)) {
      return uniqueForecastDays.push(forecastDate);
    }
  });
  if (sevenForecastDays.length > 5) sevenForecastDays.splice(0, 1);
  clearCards();
  sevenForecastDays.forEach((day) => {
    createCards(day);
  });
}

export { getCityData, getUserCoordinates, API_KEY };
