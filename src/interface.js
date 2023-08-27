import { API_KEY, getCityData } from "./weather.js";

const location = document.getElementById("location");
const search = document.getElementById("search");
const city = document.getElementById("city");
const date = document.getElementById("date");
const countryName = document.getElementById("country");
const temperature = document.getElementById("temp");
const feelsLike = document.getElementById("feels-like");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const gustSpeed = document.getElementById("gust-speed");
const description = document.getElementById("description");
const weatherImage = document.getElementById("weather-image");
const error = document.querySelector(".error");

function searchCity() {
  search.addEventListener("click", function () {
    const cityName = location.value.trim();
    if (!cityName) return;
    const GEOCODING_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
    getCityData(GEOCODING_API);
  });
}

function changeInfo(name, country) {
  city.textContent = name;
  countryName.textContent = country;
}

function changeDate(dateData) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  date.textContent = new Date(dateData).toLocaleDateString("en-GB", options);
}

function changeWeatherInfo(weatherData) {
  temperature.textContent =
    Math.round(parseFloat(weatherData.list[0].main.temp).toFixed(2)) + "°c";

  feelsLike.textContent =
    Math.round(parseFloat(weatherData.list[0].main.feels_like).toFixed(2)) +
    "°c";

  precipitation.textContent =
    parseFloat(weatherData.list[0].pop).toFixed(2) + "%";

  humidity.textContent = parseInt(weatherData.list[0].main.humidity) + "%";

  windSpeed.textContent =
    Math.round(parseFloat(weatherData.list[0].wind.speed).toFixed(2)) + "m/s";

  gustSpeed.textContent =
    Math.round(parseFloat(weatherData.list[0].wind.gust).toFixed(2)) + "m/s";

  description.textContent = capitalizeDescription(
    weatherData.list[0].weather[0].description
  );
  weatherImage.src = imageConditions(weatherData.list[0].weather[0].main);
}

function imageConditions(weather) {
  if (weather === "Clear") {
    return "https://openweathermap.org/img/wn/01d@2x.png";
  } else if (weather === "Rain") {
    return "https://openweathermap.org/img/wn/10d@2x.png";
  } else if (weather === "Drizle") {
    return "https://openweathermap.org/img/wn/09d@2x.png";
  } else if (weather === "Thunderstorm") {
    return "https://openweathermap.org/img/wn/11d@2x.png";
  } else if (weather === "Snow") {
    return "https://openweathermap.org/img/wn/13d@2x.png";
  } else if (weather === "Atmosphere") {
    return "https://openweathermap.org/img/wn/50d@2x.png";
  } else if (weather === "Clouds") {
    return "https://openweathermap.org/img/wn/02d@2x.png";
  }
}

function capitalizeDescription(string) {
  let array = string.split(" ");
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  let capitalizedArray = array.join(" ");
  return capitalizedArray;
}

function displayError() {
  location.style.marginTop = "2.1rem";
  error.style.display = "block";
}

function removeError() {
  location.style.marginTop = "0rem";
  error.style.display = "none";
}

function loadFunctions() {
  searchCity();
}

export {
  loadFunctions,
  changeInfo,
  displayError,
  removeError,
  changeDate,
  changeWeatherInfo,
};
