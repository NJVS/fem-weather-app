import currentBgDesktop from '../assets/images/bg-today-large.svg';
import currentBgMobile from '../assets/images/bg-today-small.svg';

import WeatherDrizzle from '../assets/images/icon-drizzle.webp';
import WeatherFog from '../assets/images/icon-fog.webp';
import WeatherOvercast from '../assets/images/icon-overcast.webp';
import WeatherPartlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import WeatherRain from '../assets/images/icon-rain.webp';
import WeatherSnow from '../assets/images/icon-snow.webp';
import WeatherStorm from '../assets/images/icon-storm.webp';
import WeatherSunny from '../assets/images/icon-sunny.webp';

function WeatherToday() {
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
                        <h2 className="text-3xl font-semibold text-neutral-0">Berlin, Germany</h2>
                        <p className="text-neutral-200">Monday, April 24, 2026</p>
                    </div>
                    <div className="flex items-center justify-end gap-3 grow shrink-0">
                        <img src={WeatherPartlyCloudy} alt="weather" className='h-20' />
                        <h3 className="italic font-semibold text-white text-8xl">68&deg;</h3>
                    </div>
                </div>
            </div>
            {/* other details */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(161px,1fr))] gap-3 xs:gap-6 md:gap-3 lg:gap-6">
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Feels Like</h6>
                    <p className="text-3xl font-extralight text-neutral-0">64&deg;</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Humidity</h6>
                    <p className="text-3xl font-extralight text-neutral-0">46%</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Wind</h6>
                    <p className="text-3xl font-extralight text-neutral-0">9 mph</p>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-neutral-200 font-display">Precipitation</h6>
                    <p className="text-3xl font-extralight text-neutral-0">9 in</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherToday