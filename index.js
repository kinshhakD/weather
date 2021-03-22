const key = '778393ee3f81bd3c366a22c5f6e9c1a5';
const KELVIN = 273;
const weatherElement = document.querySelector('.weatherElement');
const cityElement = document.querySelector('.cityElement');
const tempElement = document.querySelector('.tempElement');
const iconElement = document.querySelector('.iconElement');
const weather = {};

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
  console.log('not connected')
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude)
}

function showError() {
  console.log('error')
}


function getWeather(latitude, longitude) {
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data
    })
    .then(function (data) {
      weather.city = data.name + ' ' + data.sys.country;
      weather.temperature = Math.floor(data.main.temp - KELVIN);
      weather.icon = data.weather[0].icon;
      weather.unit = "celsius";
      console.log(weather)

    }).then(function () {
      showElements()
    })

}

function showElements() {
  cityElement.innerHTML = weather.city;
  tempElement.innerHTML = `${weather.temperature}<span>C</span>`;
  iconElement.innerHTML = `<img src="/icon/${weather.icon}.png"/>`
}


function celsiusToFahrenheit(temperature) {
  return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener('click', function () {

  if (weather.unit === "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}<span>F</span>`
    weather.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature}<span>C</span>`;
    weather.unit = "celsius"
  }
})
