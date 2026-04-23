import { useState } from 'react';

import DropDown from '../assets/images/icon-dropdown.svg';
import CheckMark from '../assets/images/icon-checkmark.svg';
import WeatherDrizzle from '../assets/images/icon-drizzle.webp';
import WeatherFog from '../assets/images/icon-fog.webp';
import WeatherOvercast from '../assets/images/icon-overcast.webp';
import WeatherPartlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import WeatherRain from '../assets/images/icon-rain.webp';
import WeatherSnow from '../assets/images/icon-snow.webp';
import WeatherStorm from '../assets/images/icon-storm.webp';
import WeatherSunny from '../assets/images/icon-sunny.webp';

function WeatherHourly() {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedDay, setSelectedDay] = useState('monday');
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const selectDayHandler = (day) => {
        setSelectedDay(day);
        setShowMenu(false);
    }

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
                        {selectedDay}
                        <img src={DropDown} alt="clog icon" />
                    </button>
                    {showMenu && (
                        <div className="absolute top-[calc(100%+4px)] right-0 flex flex-col p-1 bg-neutral-800 w-50 rounded text-sm border border-neutral-500 z-40">
                            {days.map((day, index) => (
                                <div key={`${index}-${day}`} className='group'>
                                    <label className="flex items-center justify-between px-3 py-2 transition rounded cursor-pointer group hover:bg-neutral-600 group-has-checked:bg-neutral-600">
                                        <span className="capitalize">{day}</span>
                                        <input type="radio" id={day} name="day" className="sr-only" checked={selectedDay == day} onChange={() => selectDayHandler(day)} />
                                        <img src={CheckMark} alt="checked" className="transition opacity-0 group-has-checked:opacity-100" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* body */}
            <div className="relative grow">
                <ul className="max-h-130 md:max-h-none md:absolute inset-0 flex flex-col gap-2.5 overflow-y-auto custom-scrollbar">
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherDrizzle} alt="" className="h-8" />
                        <span className="grow">3 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherFog} alt="" className="h-8" />
                        <span className="grow">4 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherOvercast} alt="" className="h-8" />
                        <span className="grow">6 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherPartlyCloudy} alt="" className="h-8" />
                        <span className="grow">7 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherRain} alt="" className="h-8" />
                        <span className="grow">8 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSnow} alt="" className="h-8" />
                        <span className="grow">9 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherStorm} alt="" className="h-8" />
                        <span className="grow">10 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSunny} alt="" className="h-8" />
                        <span className="grow">11 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherDrizzle} alt="" className="h-8" />
                        <span className="grow">3 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherFog} alt="" className="h-8" />
                        <span className="grow">4 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherOvercast} alt="" className="h-8" />
                        <span className="grow">6 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherPartlyCloudy} alt="" className="h-8" />
                        <span className="grow">7 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherRain} alt="" className="h-8" />
                        <span className="grow">8 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSnow} alt="" className="h-8" />
                        <span className="grow">9 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherStorm} alt="" className="h-8" />
                        <span className="grow">10 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSunny} alt="" className="h-8" />
                        <span className="grow">11 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherDrizzle} alt="" className="h-8" />
                        <span className="grow">3 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherFog} alt="" className="h-8" />
                        <span className="grow">4 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherOvercast} alt="" className="h-8" />
                        <span className="grow">6 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherPartlyCloudy} alt="" className="h-8" />
                        <span className="grow">7 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherRain} alt="" className="h-8" />
                        <span className="grow">8 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSnow} alt="" className="h-8" />
                        <span className="grow">9 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherStorm} alt="" className="h-8" />
                        <span className="grow">10 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSunny} alt="" className="h-8" />
                        <span className="grow">11 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherDrizzle} alt="" className="h-8" />
                        <span className="grow">3 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherFog} alt="" className="h-8" />
                        <span className="grow">4 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherOvercast} alt="" className="h-8" />
                        <span className="grow">6 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherPartlyCloudy} alt="" className="h-8" />
                        <span className="grow">7 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherRain} alt="" className="h-8" />
                        <span className="grow">8 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSnow} alt="" className="h-8" />
                        <span className="grow">9 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherStorm} alt="" className="h-8" />
                        <span className="grow">10 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                    <li className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-neutral-700 text-neutral-0 border border-neutral-600">
                        <img src={WeatherSunny} alt="" className="h-8" />
                        <span className="grow">11 PM</span>
                        <span className="text-sm">68&deg;</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default WeatherHourly