import { useReducer } from "react";
import { fetchWeatherForecast } from "../lib/weatherApi";
import { initialState, WeatherContext } from "./weatherContext";

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
                    ...action.payload,
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

    async function searchWeather(city) {
        dispatch({
            type: "weather/requestStarted"
        });

        try {
            const weather = await fetchWeatherForecast(city, state.units);

            dispatch({
                type: "weather/requestSucceeded",
                payload: { city, weather }
            })
        } catch (error) {
            dispatch({
                type: 'weather/requestFailed',
                payload: error.message,
            })
        }
    }

    async function updateUnits(nextUnits) {
        const updatedUnits = {
            ...state.units,
            ...nextUnits,
        }

        dispatch({
            type: "units/updated",
            payload: nextUnits,
        });

        if (!state.selectedCity) {
            return;
        }

        dispatch({ type: "weather/requestStarted" });

        try {
            const weather = await fetchWeatherForecast(state.selectedCity, updatedUnits);

            dispatch({
                type: 'weather/requestSucceeded',
                payload: {
                    city: state.selectedCity,
                    weather,
                }
            })
        } catch(error) {
            dispatch({
                type: 'weather/requestFailed',
                payload: error.message,
            })
        }
    }

    function setSelectedDayIndex(index) {
        dispatch({
            type: "day/selected",
            payload: index,
        });
    }

    const value = {
        ...state,
        searchWeather,
        updateUnits,
        setSelectedDayIndex,
    }

    return (
        <WeatherContext.Provider value={value}>
            { children }
        </WeatherContext.Provider>
    )
}
