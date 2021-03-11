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
let todayDate = document.querySelector("#time");
todayDate.innerHTML = `${weekDay}, ${dayNumber} ${month} ${currentHour}:${currentMinutes}`;


function showTemp(response){
  console.log(response.data);
  let temperature=document.querySelector("#temp-today");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");

  celsiusTemp=response.data.main.temp;

  temperature.innerHTML=Math.round(celsiusTemp);
  city.innerHTML=response.data.name;
  description.innerHTML =`🌞 ${response.data.weather[0].description}`;
  humidity.innerHTML = `💧 ${response.data.main.humidity}%`;
  wind.innerHTML = `🌬 ${Math.round(response.data.wind.speed)} Km/h`;
  
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function search(city) {
  let apiKey = "b807e5d3242a76539b823cd416c767ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchButton(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  search(searchCity.value);
}

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

function fahrTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-today");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheiTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheiTemp);
}

function celsiusTemp(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#temp-today");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchButton);
let button = document.querySelector("#search");
button.addEventListener("click", searchButton);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemp);

search("Lisbon");

