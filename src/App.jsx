import Header from "./components/Header"
import Navbar from "./components/Navbar"

function App() {

    return (
        <div className="flex justify-center min-h-screen grow bg-neutral-900 font-display">
            <div className="w-[95vw] max-w-341.5">
                <Navbar />
                <Header />
            </div>
        </div>
    )
}

export default App
