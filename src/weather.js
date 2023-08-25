const API_KEY = "226dbf12f6c9f3e021556ea66e7c95c9";

async function getCityData(API) {
  const response = await fetch(API, { mode: "cors" });
  const cityData = await response.json();
  if (!cityData.length) {
    const error = document.querySelector(".error");
    const location = document.getElementById("location");
    location.style.marginTop = "2.1rem";
    error.style.display = "block";
  }
  console.log(cityData);
}

export { getCityData, API_KEY };
