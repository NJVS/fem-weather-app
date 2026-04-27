import Header from "./components/Header"
import Navbar from "./components/Navbar"
import WeatherDaily from "./components/WeatherDaily"
import WeatherHourly from "./components/WeatherHourly"
import WeatherToday from "./components/WeatherToday"
import { useWeather } from "./context/useWeather"

import RetryIcon from "./assets/images/icon-retry.svg";

function App() {

    const { error } = useWeather();

    function handleRetry() {
        window.location.reload();
    }

    return (
        <div className="flex justify-center min-h-screen grow bg-neutral-900 font-display">
            <div className="flex flex-col w-[95vw] max-w-341.5">
                <Navbar />
                {error ? (
                    <div className="flex flex-col gap-2 items-center text-center mx-auto max-w-125 py-24">
                        <h2 className="text-4xl font-bold text-center text-white font-display">Something wen't wrong</h2>
                        <p className="font-sans text-neutral-0">We could't connect to the server(API error). Please try again in a few momemnts.</p>
                        <p className="font-sans text-neutral-0 italic">{error}</p>
                        <button onClick={handleRetry}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-display rounded-sm bg-neutral-800 text-neutral-0 border border-transparent hover:border-neutral-500 transition">
                            <img src={RetryIcon} alt="retry icon" />
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                    <Header />
                    <main className="flex flex-col w-full gap-6 mx-auto font-sans md:gap-3 lg:gap-8 max-w-275 md:flex-row">
                        <div className="flex flex-col gap-6 md:gap-3 lg:gap-8">
                            <WeatherToday />
                            <WeatherDaily />
                        </div>
                        <WeatherHourly />
                    </main>
                    </>
                )}

                <div className="py-1 mt-auto text-xs text-center text-neutral-0">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" className="text-blue-400">Frontend Mentor</a>.
                    Coded by <a href="https://njvs.github.io/portfolio-v2/" className="text-blue-400">lieneil</a>.
                </div>
            </div>
        </div>
    )
}

export default App
