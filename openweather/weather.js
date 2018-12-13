const {promisify} = require("util"); 
const weather = require('openweather-apis');
const getAllWeather = promisify(weather.getAllWeather);

weather.setCityId(2643123);
weather.setAPPID('400aecdb242227972d55392324414e07');

async function getWeather() {
	return await getAllWeather();
}

module.exports = getWeather;
