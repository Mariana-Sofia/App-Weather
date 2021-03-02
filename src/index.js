let now = new Date();
//Hours & Minutes (ex:09 while <10 instead of 9)
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let month = months[now.getMonth()];
let weekDay = days[now.getDay()];
let dayNumber = now.getDate();

//Current Date
let todayDate = document.querySelector("p#time");
todayDate.innerHTML = `${weekDay}, ${dayNumber} ${month} ${currentHour}:${currentMinutes}`;

//Today&Tomorrow Date
let today = document.querySelector("th#today");
today.innerHTML = `<strong>Today</strong> <br> ${dayNumber} ${month}`;

let tomorrow = document.querySelector("th#tomorrow");
tomorrow.innerHTML = `<strong>Tomorrow</strong> <br>${dayNumber + 1} ${month}`;

//City Title
function showTemp(response) {
  document.querySelector("#city").innerHTML = `${response.data.name} Weather`;
  document.querySelector("#temp-today").innerHTML = `${Math.round(
    response.data.main.temp
  )}ºC`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}% 💧`;
  let tempDescription=document.querySelector("#description")
  tempDescription.innerHTML = `${response.data.weather[0].main}`;
}

//Current Temp
function search(city) {
  let apiKey = "b807e5d3242a76539b823cd416c767ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city);
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", submitCity);
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", submitCity);
search("Lisbon");

function searchMyCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b807e5d3242a76539b823cd416c767ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function myCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyCity);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", myCity);

