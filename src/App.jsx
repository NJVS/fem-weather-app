import Header from "./components/Header"
import Navbar from "./components/Navbar"
import WeatherDaily from "./components/WeatherDaily"
import WeatherHourly from "./components/WeatherHourly"
import WeatherToday from "./components/WeatherToday"

function App() {

    return (
        <div className="flex justify-center min-h-screen grow bg-neutral-900 font-display">
            <div className="flex flex-col w-[95vw] max-w-341.5">
                <Navbar />
                <Header />
                
                <main className="flex flex-col w-full gap-6 mx-auto font-sans md:gap-3 lg:gap-8 max-w-275 md:flex-row">
                    <div className="flex flex-col gap-6 md:gap-3 lg:gap-8">
                        <WeatherToday />
                        <WeatherDaily />
                    </div>
                    <WeatherHourly />
                </main>

                {/* <WeatherDetails /> */}
                <div className="py-1 mt-auto text-xs text-center text-neutral-0">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" className="text-blue-400">Frontend Mentor</a>.
                    Coded by <a href="https://njvs.github.io/portfolio-v2/" className="text-blue-400">lieneil</a>.
                </div>
            </div>
        </div>
    )
}

export default App
