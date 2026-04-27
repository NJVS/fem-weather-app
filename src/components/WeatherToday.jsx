import { useWeather } from '../context/useWeather';
import { formatDate } from '../lib/helpers';
import { unitLabels } from "../lib/weatherUnits";
import { getWeatherPresentation, weatherIcons } from '../lib/weatherPresentation';

import currentBgDesktop from '../assets/images/bg-today-large.svg';
import currentBgMobile from '../assets/images/bg-today-small.svg';
import IconLoading from '../assets/images/icon-loading.svg';

function WeatherToday() {
    const { loading, weather, units } = useWeather();

    // LOADING SKELETON
    if (loading) return (
        <div className="flex flex-col gap-6 md:gap-3 lg:gap-8">
            <div className="relative overflow-hidden rounded-2xl bg-neutral-800">
                <img src={currentBgDesktop} alt="Hero" className="relative -z-10 object-cover w-full h-64" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <img src={IconLoading} alt="" />
                    <span className='text-neutral-0 text-sm font-semibold'>Loading</span>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(161px,1fr))] gap-3 xs:gap-6 md:gap-3 lg:gap-6">
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Feels Like</h6>
                    <p className="text-3xl font-extralight text-neutral-0">-</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Humidity</h6>
                    <p className="text-3xl font-extralight text-neutral-0">-</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Wind</h6>
                    <p className="text-3xl font-extralight text-neutral-0">-</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Precipitation</h6>
                    <p className="text-3xl font-extralight text-neutral-0">-</p>
                </div>
            </div>
        </div>
    )

    const weatherPresentation = weather?.current
        ? getWeatherPresentation(weather.current.weatherCode)
        : null;
    const weatherIcon = weatherIcons[weatherPresentation.iconKey];

    return (
        <div className="flex flex-col gap-6 md:gap-3 lg:gap-8">
            {/* main details */}
            <div className="relative overflow-hidden rounded-2xl">
                <picture>
                    <source media="(min-width: 768px)" srcSet={currentBgDesktop} />
                    <img src={currentBgMobile} alt="Hero" className="object-cover w-full h-64" />
                </picture>

                <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center xs:flex-row xs:text-left">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-semibold text-neutral-0">{weather.location.name}, {weather.location.country}</h2>
                        <p className="text-neutral-200">{formatDate(weather.current.time)}</p>
                    </div>
                    <div className="flex items-center justify-end gap-3 grow shrink-0">
                        <img src={weatherIcon} alt="weather" className='h-20' />
                        <h3 className="italic font-semibold text-white text-8xl">{parseInt(weather.current.temp)}&deg;</h3>
                    </div>
                </div>
            </div>
            {/* other details */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(161px,1fr))] gap-3 xs:gap-6 md:gap-3 lg:gap-6">
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Feels Like</h6>
                    <p className="text-3xl font-extralight text-neutral-0">
                        {weather.current.apparentTemp}&deg;
                        <span className='text-3xl'>{unitLabels.temperature[units.temperature]}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Humidity</h6>
                    <p className="text-3xl font-extralight text-neutral-0">{weather.current.humidity}%</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Wind</h6>
                    <p className="text-3xl font-extralight text-neutral-0">
                        {weather.current.windSpeed}&nbsp;
                        <span className='text-xl'>{unitLabels.windSpeed[units.windSpeed]}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Precipitation</h6>
                    <p className="text-3xl font-extralight text-neutral-0">
                        {weather.current.precipitation}&nbsp;
                        <span className='text-xl'>{unitLabels.precipitation[units.precipitation]}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WeatherToday