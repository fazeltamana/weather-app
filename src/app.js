function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img
  src="${response.data.condition.icon_url}"
  class="weather-app-icon"/>`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "f3e8359e69270d55det3ac4b4dc0of3a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  searchCity(searchElement.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "f3e8359e69270d55det3ac4b4dc0of3a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  //let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  let forecastElement = document.querySelector("#forecast");
  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index <= 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="weather-forcast-day">
            <div class="weather-forcast-date">${formatDay(day.time)}</div> 
            <img src="${day.condition.icon_url}" class="weather-forcast-icon"/>
            <div class="weather-forcast-temperatures">
              <div class="weather-forcast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forcast-temperature">
              ${Math.round(day.temperature.minimum)}°</div>
            </div>
          </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
displayForecast();
