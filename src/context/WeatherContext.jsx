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
    switch(action.type) {
        case "weather/requestStarted":
            return {
                ...state,
                loading: true,
                error: null,
            }
        case "weather/requestSucceeded":
            return {
                ...state,
                loading: false,
                error: null,
                selectedCity: action.payload.city,
                weather: action.payload.weather,
                selectedDayIndex: 0,
            }
        case "weather/requestFailed":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case "units/updated":
            return {
                ...state,
                units: {
                    ...state.units,
                    ...state.payload,
                }
            }
        case "day/selected":
            return {
                ...state,
                selectedDayIndex: action.payload,
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export function WeatherProvider({ children }) {
    const [state, dispatch] = useReducer(weatherReducer, initialState);
}

export function useWeather() {
    const context = useContext(WeatherContext);

    if (!context) {
        throw new Error("useWWeather must be used inside WeatherProvider!");
    }

    return context;
}