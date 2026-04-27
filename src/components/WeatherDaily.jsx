import { useWeather } from '../context/useWeather';
import { getWeatherPresentation, weatherIcons } from '../lib/weatherPresentation';

function WeatherDaily() {
    const { loading, weather, selectedDayIndex, setSelectedDayIndex } = useWeather();

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                <h5 className="text-base text-neutral-0 text-[17px]">Daily forecast</h5>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-3 xs:gap-4 md:gap-3 lg:gap-4">
                    {Array(7).fill(0).map((_, i) => (
                        <div key={i} className="h-32.5 border rounded-lg border-neutral-600 bg-neutral-700"></div>
                    ))}
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-4">
            <h5 className="text-base text-neutral-0 text-[17px]">Daily forecast</h5>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-3 xs:gap-4 md:gap-3 lg:gap-4">
                {weather.daily.map(day => (
                    <li key={day.date} className="grid">
                        <button onClick={() => setSelectedDayIndex(day.index)}
                            className={`
                                flex flex-col gap-2 px-2 py-2 border rounded-lg bg-neutral-700 hover:border-neutral-500 transition
                                ${day.index == selectedDayIndex ? 'border-neutral-400' : 'border-neutral-600'}    
                            `}>
                            <h6 className="text-center text-neutral-200 font-display">{day.dayLabel}</h6>
                            <img src={weatherIcons[getWeatherPresentation(day.weatherCode).iconKey]} alt="" className="m-auto w-13" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-neutral-300">{day.tempMin}&deg;</span>
                                <span className="text-sm text-neutral-300">{day.tempMax}&deg;</span>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WeatherDaily