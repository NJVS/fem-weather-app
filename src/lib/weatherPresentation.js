import WeatherDrizzle from '../assets/images/icon-drizzle.webp';
import WeatherFog from '../assets/images/icon-fog.webp';
import WeatherOvercast from '../assets/images/icon-overcast.webp';
import WeatherPartlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import WeatherRain from '../assets/images/icon-rain.webp';
import WeatherSnow from '../assets/images/icon-snow.webp';
import WeatherStorm from '../assets/images/icon-storm.webp';
import WeatherSunny from '../assets/images/icon-sunny.webp';
import IconLoading from '../assets/images/icon-loading.svg';

export function getWeatherPresentation(weatherCode) {
    switch (weatherCode) {
        case 0:
            return { label: "Sunny", iconKey: "sunny" };

        case 1: case 2:
            return { label: "Partly Cloudy", iconKey: "partlyCloudy" };

        case 3:
            return { label: "Overcast", iconKey: "overcast" };

        case 45: case 48:
            return { label: "Foggy", iconKey: "fog" };

        case 51: case 53: case 55: case 56: case 57:
            return { label: "Drizzly", iconKey: "drizzle" };

        case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:
            return { label: "Rainy", iconKey: "rain" };

        case 71: case 73: case 75: case 77: case 85: case 86:
            return { label: "Snowy", iconKey: "snow" };

        case 95: case 96: case 99:
            return { label: "Stormy", iconKey: "storm" };

        default:
            return { label: "Weather", iconKey: "sunny" };
    }
}

export const weatherIcons = {
  sunny: WeatherSunny,
  partlyCloudy: WeatherPartlyCloudy,
  overcast: WeatherOvercast,
  fog: WeatherFog,
  drizzle: WeatherDrizzle,
  rain: WeatherRain,
  snow: WeatherSnow,
  storm: WeatherStorm,
};