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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2 weather-forecast">
          <div class="weather-forecast-date">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt=""
              width="60"
            />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temp-min"> 9° </span
            ><span class="weather-forecast-temp-max"> 9° </span>
          </div>
        </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeatherConditions(response) {
  console.log(response.data);
  let cityNow = document.querySelector("#currentCity");
  cityNow.innerHTML = response.data.name;
  let tempNow = document.querySelector("#current-temperature");
  tempNow.innerHTML = Math.round(response.data.main.temp);
  let descriptionNow = document.querySelector("#current-description");
  descriptionNow.innerHTML = response.data.weather[0].main;
  let iconNow = document.querySelector("#icon-position");
  iconNow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let windNow = document.querySelector("#wind-speed");
  windNow.innerHTML = Math.round(response.data.wind.speed);
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
displayForecast();
