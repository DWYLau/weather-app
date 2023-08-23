async function getWeather() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=9a625962efd24cb5afb11327232108&q=yokohama",
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

export { getWeather };
