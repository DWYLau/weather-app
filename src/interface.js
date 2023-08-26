import { API_KEY, getCityData } from "./weather.js";

const location = document.getElementById("location");
const search = document.getElementById("search");
const city = document.getElementById("city");
const date = document.getElementById("date");
const countryName = document.getElementById("country");
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

export { loadFunctions, changeInfo, displayError, removeError, changeDate };
