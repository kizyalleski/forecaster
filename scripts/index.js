"use strict";
const apiKey = "0a009c7e910fd010e5052fe3429af814";

function getCityCoords(city) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0a009c7e910fd010e5052fe3429af814`
  )
    .then((response) => response.json())
    .then((data) => fetchWeather(data[0].name, data[0].lat, data[0].lon));
}

function fetchWeather(city, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(city, data));
}

function displayWeather(city, data) {
  const weather = {
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };

  const heading = document.querySelector("#city");
  const temperature = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const icon = document.querySelector("#icon");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");

  heading.textContent = "Weather in " + city;
  temperature.textContent = weather.temperature + " °C";
  description.textContent =
    weather.description[0].toLocaleUpperCase() + weather.description.slice(1);
  icon.src = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
  humidity.textContent = "Humidity: " + weather.humidity + "%";
  wind.textContent = "Wind speed: " + weather.wind + "km/h";
}

getCityCoords("Chicago");

const form = document.forms.cityForm;
const formInput = form.elements.cityInput;
form.addEventListener('submit', e => {
  e.preventDefault();
  getCityCoords(formInput.value);
  form.reset();
});
