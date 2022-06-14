function getCurrentDate(now) {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDay[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day}, ${hour}:${minute}`;
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let showTemperature = document.querySelector("#temp");
  showTemperature.innerHTML = `${temp}°C`;
  let city = document.querySelector("h1");
  city.innerHTML = `${cityName}, ${countryName}`;

  celSiusTemperature = response.data.main.temp;
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-input");
  if (inputCity.value) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=fb7cdde54d32ea9c336c56bdf8dda6ee&units=metric`;
    axios.get(apiUrl).then(showTemp);
  } else {
    let city = document.querySelector("h1");
    city.innerHTML = `<p style="font-size:16px">You didn't type anytjing 🤔</p>`;
  }
}

function currentLocWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fb7cdde54d32ea9c336c56bdf8dda6ee&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocWeather);
}

//Search your city
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", searchCity);

//Show current time and date
let currentDate = new Date();
let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = getCurrentDate(currentDate);

//Ask for current location and show the weather
let currentButton = document.querySelector(".crnt-btn");
currentButton.addEventListener("click", currentLocation);

//Display the start city
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=fb7cdde54d32ea9c336c56bdf8dda6ee&units=metric`;
axios.get(apiUrl).then(showTemp);

let celSiusTemperature = null;

//Change celcium or fahreinheit temp
let cels = document.querySelector("#cels");
let far = document.querySelector("#far");
cels.addEventListener("click", getCelsTemp);
far.addEventListener("click", getFarTemp);

function getCelsTemp(event) {
  event.preventDefault();
  let CelsTemp = document.querySelector("#temp");
  CelsTemp.innerHTML = celSiusTemperature * 1.8 + 32;
}

/*function getFarTemp(event) {
  event.preventDefault();
  let FarTemp = document.querySelector("#temp");
  FarTemp.innerHTML = `${Math.round(temp * 1.8 + 32)}`;
}
*/
