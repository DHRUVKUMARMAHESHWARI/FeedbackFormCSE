const axios = require('axios');

const weatherMiddleware = async (req, res, next) => {
  try {
    // Fetch weather data from OpenWeatherMap API
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${process.env.CITY}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherApiUrl);
    const weatherData = weatherResponse.data;
    const weatherCondition = weatherData.weather[0].main.toLowerCase(); // Get weather condition (e.g., rain, clear, clouds)
    const currentTime = new Date();
    const currentHour = currentTime.getHours(); // Get the current hour (0-23)

    // Determine the appropriate weather image
    let weatherImage;
    if (weatherCondition.includes('rain')) {
      weatherImage = '/images/2682835_cloud_cloudy_forecast_precipitation_rain_icon.png'; // Replace with actual path to your rain image
    } else if (weatherCondition.includes('cloud')) {
      weatherImage = '/images/2682850_cloud_clouds_cloudy_forecast_weather_icon.png'; // Replace with actual path to your cloud image
    } else if (weatherCondition.includes('clear')) {
      weatherImage = '/images/2682848_day_forecast_sun_sunny_weather_icon.png'; // Replace with actual path to your sunny image
    } else {
      weatherImage = '/images/8520312_clear_night_star_forecast_dark_icon.png'; // Default image
    }

    // Determine the appropriate time image
    let greeting;
    if (currentHour >= 6 && currentHour < 18) {
      greeting = "Good Morning" // Morning/Daytime image
    } else {
      greeting = "Good Night" // Nighttime image
    }

    // Attach data to res.locals for use in EJS template
    res.locals.weather = weatherData;
    res.locals.weatherImage = weatherImage;
    res.locals.greeting = greeting;
    res.locals.currentTime = currentTime.toLocaleTimeString();

    next();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.locals.weather = null;
    res.locals.weatherImage = '/images/default-weather.png';
    res.locals.greeting = 'Have a nice day';
    res.locals.currentTime = new Date().toLocaleTimeString();
    next();
  }
};

module.exports = weatherMiddleware;
