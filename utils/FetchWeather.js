const fetchData = require("./FetchData");

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const fetchWeather = async (lat, long, timezone) => {
  const BASE_API_PATH = `${BASE_URL}?latitude=${lat}&longitude=${long}&timezone=${timezone}`;
  
  try {
    const currentWeatherApi = `${BASE_API_PATH}&current=temperature_2m,relative_humidity_2m,weather_code,pressure_msl,wind_speed_10m&forecast_days=1`;
    const hourlyWeatherApi = `${BASE_API_PATH}&hourly=temperature_2m,weather_code&forecast_days=2`;
    const dailyWeatherApi = `${BASE_API_PATH}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=8`;

    const currentWeatherData = await fetchData(currentWeatherApi);
    const hourlyWeatherData = await fetchData(hourlyWeatherApi);
    const dailyWeatherData = await fetchData(dailyWeatherApi);

    const weatherData = {
      "current_weather": {
        "current_units": currentWeatherData.current_units,
        "current": currentWeatherData.current,
      },
      "hourly_weather": {
        "hourly_units": hourlyWeatherData.hourly_units,
        "hourly": hourlyWeatherData.hourly,
      },
      "daily_weather": {
        "daily_units": dailyWeatherData.daily_units,
        "daily": dailyWeatherData.daily,
      },
    };

    return weatherData;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = fetchWeather;
