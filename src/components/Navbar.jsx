import { useMemo, useState } from 'react';

import { useWeather } from '../context/useWeather';

import Logo from '../assets/images/logo.svg';
import Clog from '../assets/images/icon-units.svg';
import DropDown from '../assets/images/icon-dropdown.svg';
import CheckMark from '../assets/images/icon-checkmark.svg';

const METRIC_UNITS = {
    temperature: 'celsius',
    windSpeed: 'kmh',
    precipitation: 'mm',
};

const IMPERIAL_UNITS = {
    temperature: 'fahrenheit',
    windSpeed: 'mph',
    precipitation: 'inch',
};

function getWeatherSystem(units) {
    const isMetric =
        units.temperature === 'celsius' &&
        units.windSpeed === 'kmh' &&
        units.precipitation === 'mm';

    const isImperial =
        units.temperature === 'fahrenheit' &&
        units.windSpeed === 'mph' &&
        units.precipitation === 'inch';

    if (isMetric) return 'metric';
    if (isImperial) return 'imperial';

    return null;
}

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const { units, updateUnits } = useWeather();
    const { temperature, windSpeed, precipitation } = units;
    const [lastSystem, setLastSystem] = useState(() => getWeatherSystem(units) ?? 'metric');

    const weatherSystem = useMemo(
        () => getWeatherSystem({ temperature, windSpeed, precipitation }),
        [precipitation, temperature, windSpeed]
    );

    const activeSystem = weatherSystem ?? lastSystem;
    const nextSystem = activeSystem === 'imperial' ? 'metric' : 'imperial';

    async function toggleSystem() {
        setLastSystem(nextSystem);
        await updateUnits(nextSystem === 'imperial' ? IMPERIAL_UNITS : METRIC_UNITS);
    }

    async function handleUnitChange(nextUnits) {
        const updatedUnits = { ...units, ...nextUnits };
        const updatedSystem = getWeatherSystem(updatedUnits);

        if (updatedSystem) {
            setLastSystem(updatedSystem);
        }

        await updateUnits(nextUnits);
    }

    return (
        <div className="flex justify-between py-4">
            <a href="/">
                <img src={Logo} alt="Weather app logo" />
            </a>

            <div className="relative text-neutral-0">
                <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className={`
                        flex items-center gap-2 px-4 py-2 text-sm font-display rounded-sm bg-neutral-800 text-neutral-0 border
                        ${showMenu ? 'border-neutral-500' : 'border-transparent'}
                    `}
                >
                    <img src={Clog} alt="units icon" />
                    Units
                    <img src={DropDown} alt="toggle menu" />
                </button>

                {showMenu && (
                    <div className="absolute top-[calc(100%+4px)] right-0 flex flex-col p-1 bg-neutral-800 w-50 rounded text-sm border border-neutral-500 z-40">
                        <button
                            onClick={toggleSystem}
                            className="flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600"
                        >
                            <span className="capitalize">Switch to {nextSystem}</span>
                        </button>

                        <div className="flex flex-col border-b border-neutral-600">
                            <h4 className="text-sm text-neutral-300 px-3 pt-1.5 pb-1">Temperature</h4>
                            <div className="flex flex-col gap-0.5">
                                <button
                                    onClick={() => handleUnitChange({ temperature: 'celsius' })}
                                    className={`
                                        flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600
                                        ${temperature === 'celsius' ? 'bg-neutral-600' : ''}
                                    `}
                                >
                                    Celsius (&deg;C)
                                    {temperature === 'celsius' && (
                                        <img src={CheckMark} alt="" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleUnitChange({ temperature: 'fahrenheit' })}
                                    className={`
                                        flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600
                                        ${temperature === 'fahrenheit' ? 'bg-neutral-600' : ''}
                                    `}
                                >
                                    Fahrenheit (&deg;F)
                                    {temperature === 'fahrenheit' && (
                                        <img src={CheckMark} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col border-b border-neutral-600">
                            <h4 className="text-sm text-neutral-300 px-3 pt-1.5 pb-1">Wind Speed</h4>
                            <div className="flex flex-col gap-0.5">
                                <button
                                    onClick={() => handleUnitChange({ windSpeed: 'kmh' })}
                                    className={`
                                        flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600
                                        ${windSpeed === 'kmh' ? 'bg-neutral-600' : ''}
                                    `}
                                >
                                    km/h
                                    {windSpeed === 'kmh' && (
                                        <img src={CheckMark} alt="" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleUnitChange({ windSpeed: 'mph' })}
                                    className={`
                                        flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600
                                        ${windSpeed === 'mph' ? 'bg-neutral-600' : ''}
                                    `}
                                >
                                    mph
                                    {windSpeed === 'mph' && (
                                        <img src={CheckMark} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-sm text-neutral-300 px-3 pt-1.5 pb-1">Precipitation</h4>
                            <div className="flex flex-col gap-0.5">
                                <button
                                    onClick={() => handleUnitChange({ precipitation: 'mm' })}
                                    className={`
                                        flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600
                                        ${precipitation === 'mm' ? 'bg-neutral-600' : ''}
                                    `}
                                >
                                    Millimeters (mm)
                                    {precipitation === 'mm' && (
                                        <img src={CheckMark} alt="" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleUnitChange({ precipitation: 'inch' })}
                                    className={`
                                        flex items-center justify-between px-3 py-2 transition rounded hover:bg-neutral-600
                                        ${precipitation === 'inch' ? 'bg-neutral-600' : ''}
                                    `}
                                >
                                    Inches (in)
                                    {precipitation === 'inch' && (
                                        <img src={CheckMark} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar
