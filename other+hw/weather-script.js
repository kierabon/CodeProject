let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let form = document.querySelector ('#search-form');
let h5 = document.querySelector(`#date`);
h5.innerHTML= `${day} ${month} ${date}, ${year}  ${hours}:${minutes}`;
 


function showWeather(response) {
  let temperatureNow = document.querySelector("#temperature");
  let tempNow = Math.round(response.data.main.temp);
  let city = response.data.name;
  let cityNow = document.querySelector("#city-check");
  let humid = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let wind = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  let description = document.querySelector("#description");
  let weatherDescription = response.data.weather[0].description;

  description.innerHTML = `${weatherDescription}`;
  wind.innerHTML = `Wind Speed: ${windSpeed}m/s`;
  humid.innerHTML = `Humidity: ${humidity}%`;
  cityNow.innerHTML = `${city}`;
  temperatureNow.innerHTML = `${tempNow}`;
}

function weatherLocation(position) {
  let apiKey = "39a4dba5764c859c9c8cade7545d15da";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(weatherLocation);
}

function getCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city-check");
  let citySearch = searchInput.value;
  let apiKey = "39a4dba5764c859c9c8cade7545d15da";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
  city.innerHTML = `${citySearch}`;
  axios.get(url).then(showWeather);
}

let button = document.querySelector("button");

button.addEventListener("click", getCurrentPosition);
form.addEventListener("submit",getCitySearch);


