import { useEffect, useRef, useState } from 'react';
import { useWeather } from '../context/useWeather';
import { getWeatherLabel } from '../lib/weatherPresentation';
import { getWeatherPresentation, weatherIcons } from '../lib/weatherPresentation';
import { getHour } from '../lib/helpers';

import DropDown from '../assets/images/icon-dropdown.svg';

function WeatherHourly() {
    const [showMenu, setShowMenu] = useState(false);
    const activeHour = useRef(null);
    const { loading, weather, selectedDayIndex, setSelectedDayIndex } = useWeather();

    useEffect(() => {
        if (activeHour.current) {
            activeHour.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [weather, selectedDayIndex])

    const selectDayHandler = (day) => {
        setSelectedDayIndex(day.index)
        setShowMenu(false);
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-4 grow min-w-65.25 bg-neutral-800 p-4 rounded-2xl">
                <div className="flex items-center justify-between gap-2">
                    <h5 className="text-base text-neutral-0 text-[17px]">Hourly forecast</h5>
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-display rounded-sm bg-neutral-600 text-neutral-0 capitalize">
                        &mdash;
                        <img src={DropDown} alt="clog icon" />
                    </div>
                </div>
                <div className="relative grow">
                    <ul className="max-h-130 md:max-h-none md:absolute inset-0 flex flex-col gap-2.5 overflow-y-auto custom-scrollbar">
                        {Array(24).fill(0).map((_, i) => (
                            <li key={i} className="min-h-11.5 border rounded-lg border-neutral-600 bg-neutral-700"></li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    const hourlyItems = weather.hourly.filter((item) => item.dayKey == weather.daily[selectedDayIndex].date);



    return (
        <div className="flex flex-col gap-4 grow min-w-65.25 bg-neutral-800 p-4 rounded-2xl">
            {/* header */}
            <div className="flex items-center justify-between gap-2">
                <h5 className="text-base text-neutral-0 text-[17px]">Hourly forecast</h5>
                {/* dropdown */}
                <div className="relative text-neutral-0">
                    <button onClick={() => setShowMenu(prev => !prev)}
                        className={`
                                        flex items-center gap-2 px-3 py-1.5 text-sm font-display rounded-sm bg-neutral-600 text-neutral-0 border capitalize
                                        ${showMenu ? "border-neutral-500" : "border-transparent"}
                                    `}>
                        {getWeatherLabel[weather.daily[selectedDayIndex].dayLabel]}
                        <img src={DropDown} alt="clog icon" />
                    </button>
                    {showMenu && (
                        <div className="absolute top-[calc(100%+4px)] right-0 flex flex-col p-1 bg-neutral-800 w-50 rounded text-sm border border-neutral-500 z-40">
                            {weather.daily.map(day => (
                                <button onClick={() => selectDayHandler(day)} key={day.date}
                                    className="flex items-center justify-between px-3 py-2 transition rounded cursor-pointer hover:bg-neutral-600">
                                    <span className="capitalize">{getWeatherLabel[day.dayLabel]}</span>
                                    {day.date == weather.daily[selectedDayIndex].date && (
                                        <img src={CheckMark} alt="checked" className="transition" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* body */}
            <div className="relative grow">
                <ul className="max-h-130 md:max-h-none md:absolute inset-0 flex flex-col gap-2.5 overflow-y-auto custom-scrollbar">
                    {hourlyItems.map(item => {
                        const isActive = getHour(weather.current.time) === getHour(item.time);
                        return (
                            <li key={item.time}
                                ref={isActive ? activeHour : null}
                                className={`
                                    flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border 
                                    ${isActive ? 'border-neutral-500' : 'border-neutral-600'}
                                `}>
                                <img src={weatherIcons[getWeatherPresentation(item.weatherCode).iconKey]} alt="" className="h-8" />
                                <span className="grow">{item.timeLabel}</span>
                                <span className="text-sm">{item.temp}&deg;</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default WeatherHourly