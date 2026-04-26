/**
 *  Weather API Utilities
 */

function formatDayLabel(dateString) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone: "UTC",
    }).format(new Date(`${dateString}T00:00:00Z`));
}

function formatHourLabel(dateTimeString) {
    const [hourString] = dateTimeString.split("T")[1].split(":");
    const hour = Number(hourString);
    const suffix = hour >= 12 ? "PM" : "AM";
    const twelveHour = hour % 12 || 12;

    return `${twelveHour} ${suffix}`;
}

function makeLocationLabel(city) {
    return [city.name, city.admin1, city.country].filter(Boolean).join(", ");
}

function normalizeWeatherData(city, data) {
    const daily = data.daily.time.map((date, index) => ({
        index,
        date,
        dayLabel: formatDayLabel(date),
        weatherCode: data.daily.weather_code[index],
        tempMax: data.daily.temperature_2m_max[index],
        tempMin: data.daily.temperature_2m_min[index],
        precipitationSum: data.daily.precipitation_sum[index],
    }));
    // console.log('Normalize Weather(Daily): ', daily);

    const hourly = data.hourly.time.map((time, index) => ({
        time,
        dayKey: time.slice(0, 10),
        timeLabel: formatHourLabel(time),
        temp: data.hourly.temperature_2m[index],
        weatherCode: data.hourly.weather_code[index],
        precipitationProbability: data.hourly.precipitation_probability[index]
    }));
    // console.log('Normalize Weather(Hourly): ', hourly);
    
    const normalize_weather = {
        location: {
            name: city.name,
            country: city.country,
            label: makeLocationLabel(city),
            latitude: city.latitude,
            longitude: city.longitude,
        },
        current: {
            time: data.current.time,
            temp: data.current.temperature_2m,
            apparentTemp: data.current.apparent_temperature,
            humidity: data.current.relative_humidity_2m,
            precipitation: data.current.precipitation,
            weatherCode: data.current.weather_code,
            windSpeed: data.current.wind_speed_10m,
        },
        daily,
        hourly,
        timezone: data.timezone,
    }
    console.log('Normalize WeatherL: ', normalize_weather);

    return normalize_weather;
}

export async function fetchWeatherForecast(city, units) {
    // create url parameters: ?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm
    const params = new URLSearchParams({
        latitude: String(city.latitude),
        longitude: String(city.longitude),
        current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "precipitation",
            "weather_code",
            "wind_speed_10m",
        ].join(","),
        hourly: [
            "temperature_2m",
            "weather_code",
            "precipitation_probability"
        ].join(","),
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum"
        ].join(","),
        forecast_days: "7",
        timezone: "auto",
        temperature_units: units.temperature,
        wind_speed_unit: units.windSpeed,
        precipitation_unit: units.precipitation,
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Weather request failed (STATUS: ${response.status})`);
    }

    const data = await response.json();
    return normalizeWeatherData(city, data);
}