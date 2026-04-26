import { useContext } from "react";
import { WeatherContext } from "./weatherContext";

export function useWeather() {
    return useContext(WeatherContext);
}
