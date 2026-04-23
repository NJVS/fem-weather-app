import WeatherDrizzle from '../assets/images/icon-drizzle.webp';
import WeatherFog from '../assets/images/icon-fog.webp';
import WeatherOvercast from '../assets/images/icon-overcast.webp';
import WeatherPartlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import WeatherRain from '../assets/images/icon-rain.webp';
import WeatherSnow from '../assets/images/icon-snow.webp';
import WeatherStorm from '../assets/images/icon-storm.webp';
import WeatherSunny from '../assets/images/icon-sunny.webp';

function WeatherDaily() {
    return (
        <div className="flex flex-col gap-4">
            <h5 className="text-base text-neutral-0 text-[17px]">Daily forecast</h5>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-3 xs:gap-4 md:gap-3 lg:gap-4">
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Fri</h6>
                    <img src={WeatherDrizzle} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Sat</h6>
                    <img src={WeatherFog} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Sun</h6>
                    <img src={WeatherOvercast} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Mon</h6>
                    <img src={WeatherPartlyCloudy} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Tue</h6>
                    <img src={WeatherRain} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Wed</h6>
                    <img src={WeatherSnow} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 border rounded-lg border-neutral-600 bg-neutral-700">
                    <h6 className="text-center text-neutral-200 font-display">Thu</h6>
                    <img src={WeatherStorm} alt="" className="m-auto w-13" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-300">68&deg;</span>
                        <span className="text-sm text-neutral-300">57&deg;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDaily