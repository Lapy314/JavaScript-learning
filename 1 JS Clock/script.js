const wrapper = document.querySelector(".wrapper");
const glassDisplay = document.querySelector(".glass-display");
const clock = document.querySelector(".digital-clock");
const hourDiv = document.querySelector(".hour");
const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");
const optionsBtn = document.querySelector(".options-btn");
const options = document.querySelector(".options");
const spremiBtn = document.querySelector(".spremi-btn");
const selectorTemp = document.querySelector("select[name='temperature-format']");
const selectorHourFormat = document.querySelector("select[name='hour-format-select']");
const glowSliders = document.querySelectorAll("input[type=range]");
const cityInput = document.querySelector("input[name=city]");
const cityForm = document.querySelector("form[name=city-form]");
const apiKey = 'y2GY6i1K3YxbSGJJRVqQRyoGoRlofZAl';
let cityName = document.querySelector(".city-name");
const date_span = document.querySelector(".date");
const day_span = document.querySelector(".day");
const btnSubmit = document.querySelector(".btn-submit");
const weatherFormat = document.querySelector("#temperatura-format");
const weatherDegrees = document.querySelector("#temperatura-value")

//dohvati datum 
function getDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const getDay = new Date(today);
  const day = getDay.getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  dayNames.forEach((dayName, i) => {
    if (day === i) {
      day_span.textContent = dayName;
    }
  });

  today = dd + '.' + mm + '.' + yyyy;
  date_span.textContent = today;
}

//format sata 12/24
function handleHourFormat() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  minutesDiv.innerHTML = minutes;
  secondsDiv.innerHTML = seconds;

  console.log(hours);

  (hours < 10) ? hourDiv.innerHTML = `0${hours}` : hourDiv.innerHTML = `${hours}`;
  (minutes < 10) ? minutesDiv.innerHTML = `0${minutes}` : minutesDiv.innerHTML = `${minutes}`;
  (seconds < 10) ? secondsDiv.innerHTML = `0${seconds}` : secondsDiv.innerHTML = `${seconds}`;

  if (selectorHourFormat.value === "12h") {
    if (hours === 0) {
      hourDiv.innerHTML = `<span class = "clockText">am</span> ${hours + 12}`;
    } else if (hours <= 12) {
      hourDiv.innerHTML = `<span class = "clockText">am</span> ${hours}`;
    } else {
      hourDiv.innerHTML = `<span class = "clockText">pm</span> ${hours - 12}`;
    }
  } 
}

//slideri za jacinu glowa
glowSliders.forEach(slider => {
  slider.addEventListener("change", (e) => {
    if (e.target.name === "glow-strength-clock") {
      clock.style.boxShadow = `0 0 ${e.target.value}px red`;
    } else {
      glassDisplay.style.boxShadow = `0 0 ${e.target.value}px cyan`;
    }
  });
});

//pretrazivanje gradova
async function handleCitySearch(q) {
  let url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${q}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;

}

//dohvacanje temperature
async function handleCityTemperature(cityKey) {
  let url = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  return data;
}

//default podaci pri pokretanju
function loadCityData() {
  const weatherDegrees = document.querySelector("#temperatura-value");
  const weatherConditions = document.querySelector("#weather-conditions");
  handleCitySearch("kastel stafilic")
    .then(data => {
      cityName.textContent = data[0].LocalizedName;
      console.log(cityName.textContent);
      return handleCityTemperature(data[0].Key);
    })
    .then(data => {
      weatherDegrees.textContent = data[0].Temperature.Metric.Value;
      weatherConditions.textContent = data[0].WeatherText;
      getWeatherIcon(data[0].WeatherIcon);
    });
}

//forma za grad
btnSubmit.addEventListener("click", (e) => {

  let weatherDegrees = document.querySelector("#temperatura-value");
  const weatherConditions = document.querySelector("#weather-conditions");

  handleCitySearch(cityInput.value)
    .then(data => {
      cityName.textContent = data[0].LocalizedName;
      console.log(cityName.textContent);
      return handleCityTemperature(data[0].Key);
    })
    .then(data => {
      if (selectorTemp.value === "celsius") {
        weatherDegrees.textContent = data[0].Temperature.Metric.Value;
        weatherFormat.innerHTML = "&degC";
      } else {
        weatherDegrees.textContent = data[0].Temperature.Imperial.Value;
        weatherFormat.innerHTML = "&degF";
      }
      weatherConditions.textContent = data[0].WeatherText;
      getWeatherIcon(data[0].WeatherIcon);
    });

});

//dohvaca ikonu za prikaz vrimena
function getWeatherIcon(weatherIcon) {
  const weatherIconImg = document.querySelector("#weather-icon");
  if (weatherIcon < 6) {
    weatherIconImg.setAttribute("src", "img/sun.png");
  } else if (weatherIcon > 5 && weatherIcon < 12) {
    weatherIconImg.setAttribute("src", "img/cloud.png");
  } else if (weatherIcon > 11 && weatherIcon < 19) {
    weatherIconImg.setAttribute("src", "img/rain.png");
  } else if (weatherIcon > 32 && weatherIcon < 45) {
    weatherIconImg.setAttribute("src", "img/moon.png");
  }
}

selectorHourFormat.addEventListener("change", handleHourFormat);

setInterval(handleHourFormat, 1000);
getDate();
loadCityData();


