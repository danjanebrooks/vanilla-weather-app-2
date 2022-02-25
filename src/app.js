let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = `${day}, ${hour}:${minutes}`;

let mainDate = document.querySelector("#currentDate");
mainDate.innerHTML = date;

function showWeatherConditions(response) {
  let cityNow = document.querySelector("#currentCity");
  cityNow.innerHTML = response.data.name;
  let tempNow = document.querySelector("#current-temperature");
  tempNow.innerHTML = Math.round(response.data.main.temp);
  let descriptionNow = document.querySelector("#current-description");
  descriptionNow.innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchInput = document.querySelector("#search-text-input");
searchInput.addEventListener("submit", searchCity);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
  let apiKey = "9fa9cfaaf08295b20a3f013e5b353905";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function showPosition(position) {
  let apiKey = "9fa9cfaaf08295b20a3f013e5b353905";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function clickCelsius(event) {
  event.preventDefault();
  let currentCelsius = document.querySelector("#current-temperature");
  currentCelsius.innerHTML = 9;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", clickCelsius);

function clickFahrenheit(event) {
  event.preventDefault();
  let currentFahrenheit = document.querySelector("#current-temperature");
  currentFahrenheit.innerHTML = 48;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", clickFahrenheit);

search("Manchester");
