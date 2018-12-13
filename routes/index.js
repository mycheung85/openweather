const express = require('express');
const weather = require('../openweather/weather');

let router = express.Router();

function getTemp(weatherObj) {
  console.log(weatherObj)
  return weatherObj.main.temp;
}

function getSunrise(weatherObj) {
  let sunrise = convert(weatherObj.sys.sunrise * 1000)
  return sunrise
}

function getSunset(weatherObj) {
  let sunset = convert(weatherObj.sys.sunset * 1000)
  return sunset
}

function convert(time) {
  let newDate = new Date(time)
  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  let seconds = newDate.getSeconds()
  return hours + ":" + minutes
}

function getCity(weatherObj) {
  return weatherObj.name;
}

function getWindSpeed(weatherObj) {
  return weatherObj.wind.speed;
}

function getPressure(weatherObj) {
  return weatherObj.main.pressure;
}

function getIcon(weatherObj) {
  return weatherObj.weather[0].icon
}

router.get('/', async function (req, res, next) {
  
  let weatherObj = await weather();
  let temp = getTemp(weatherObj);
  let sunrise = getSunrise(weatherObj)
  let sunset = getSunset(weatherObj)
  let city = getCity(weatherObj)
  let windSpeed = getWindSpeed(weatherObj)
  let pressure = getPressure(weatherObj)
  let icon = getIcon(weatherObj);
  let url = "http://openweathermap.org/img/w/" + icon +".png"
  console.log(icon)

  res.render('index', {temp: temp, sunrise: sunrise, sunset: sunset, city: city, windSpeed: windSpeed, pressure: pressure, url: url});
});

module.exports = router;