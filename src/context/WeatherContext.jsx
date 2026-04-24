import { createContext, useContext, useReducer } from "react";

const WeatherContext = createContext(null);

const initialState = {
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
}

function weatherReducer(state, action) {

}

export function WeatherProvider({ children }) {
    const [state, dispatch] = useReducer(weatherReducer, initialState)
}

export function useWeather() {
    const context = useContext(WeatherContext);

    if (!context) {
        throw new Error("useWWeather must be used inside WeatherProvider!");
    }

    return context;
}