import { useState } from 'react';
import { useCityAutocomplete } from '../hooks/useCityAutocomplete';

import SearchIcon from '../assets/images/icon-search.svg';

function Header() {
    const [input, setInput] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

    const formatCityLabel = (city) => city.country ? `${city.name}, ${city.country}` : city.name;

    const activeQuery = selectedCity && input === formatCityLabel(selectedCity) ? '' : input;
    const { suggestions, loading } = useCityAutocomplete(activeQuery);

    const hasQuery = Boolean(activeQuery.trim());
    const showNoResults = hasQuery && !loading && suggestions.length === 0;
    const showDropdown = hasQuery && (loading || suggestions.length > 0 || showNoResults);

    const handleChange = (event) => {
        if (selectedCity) {
            setSelectedCity(null);
        }

        setInput(event.target.value);
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setInput(formatCityLabel(city));

        console.log('Selected city:', city.name, city.country, city.latitude, city.longitude);
    };

    return (
        <header className="flex flex-col items-center justify-center py-10 gap-14">
            <h1 className="text-5xl font-bold text-center text-white font-display">How's the skylooking today?</h1>

            <div className="flex gap-4 w-137.5 max-w-full">
                <div className="relative flex rounded-md grow bg-neutral-700">
                    <img src={SearchIcon} alt="search icon" className="absolute -translate-y-1/2 left-4 top-1/2" />

                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        className="grow flex items-center py-2.5 pl-12 text-neutral-0"
                        placeholder="Search for a place..."
                    />

                    {showDropdown && (
                        <ul className="absolute top-[calc(100%+6px)] w-full flex flex-col gap-1 p-1 rounded-md border border-neutral-500 bg-neutral-700 font-sans z-40">
                            {loading ? (
                                <li className="flex justify-start px-3 py-2 text-sm rounded-md text-neutral-0">
                                    Loading...
                                </li>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((city) => (
                                    <li key={`${city.id}-${city.latitude}-${city.longitude}`}>
                                        <button
                                            type="button"
                                            className="flex justify-start w-full px-3 py-2 text-sm transition rounded-md hover:bg-neutral-600 text-neutral-0"
                                            onClick={() => handleSelectCity(city)}
                                        >
                                            {city.name}, {city.country}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="flex justify-start px-3 py-2 text-sm rounded-md text-neutral-300">
                                    No places found.
                                </li>
                            )}
                        </ul>
                    )}
                </div>
                <button className="px-6 py-2.5 transition bg-blue-500 rounded-md text-neutral-0 hover:bg-blue-700">Search</button>
            </div>
        </header>
    )
}

export default Header
