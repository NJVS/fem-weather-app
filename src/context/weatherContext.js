import { createContext } from "react";

export const initialState = {
    selectedCity: null,
    units: {
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm"
    },
    weather: null,
    loading: false,
    error: null,
    selectedDayIndex: 0,
};

async function noopAsync() {}

function noop() {}

export const defaultWeatherContextValue = {
    ...initialState,
    searchWeather: noopAsync,
    updateUnits: noopAsync,
    setSelectedDayIndex: noop,
};

export const WeatherContext = createContext(defaultWeatherContextValue);
