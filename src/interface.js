import { API_KEY, getCityData } from "./weather.js";

const location = document.getElementById("location");
const search = document.getElementById("search");

function searchCity() {
  search.addEventListener("click", function () {
    let cityName = location.value.trim();
    if (!cityName) return;
    console.log(cityName);

    const GEOCODING_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
    getCityData(GEOCODING_API);
  });
}

function loadFunctions() {
  searchCity();
}

export { loadFunctions };
