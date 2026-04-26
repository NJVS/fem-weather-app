import { useState } from 'react';
import { useCityAutocomplete } from '../hooks/useCityAutocomplete';
import { useWeather } from '../context/WeatherContext';

import SearchIcon from '../assets/images/icon-search.svg';

function Header() {
    const [input, setInput] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const { searchWeather, loading } = useWeather();
    
    const normalizeLabelPart = (value) => String(value ?? '').trim().toLowerCase();

    const getFeatureLabel = (featureCode) => {
        if (!featureCode) {
            return '';
        }

        if (featureCode === 'PPLC') {
            return 'Capital';
        }

        if (featureCode.startsWith('PPL')) {
            return 'City';
        }

        if (featureCode.startsWith('ADM')) {
            return 'Administrative area';
        }

        return featureCode;
    };

    const getLocationContext = (city) => {
        const seen = new Set([normalizeLabelPart(city.name)]);

        return [city.admin4, city.admin3, city.admin2, city.admin1, city.country]
            .filter(Boolean)
            .filter((part) => {
                const normalizedPart = normalizeLabelPart(part);

                if (!normalizedPart || seen.has(normalizedPart)) {
                    return false;
                }

                seen.add(normalizedPart);
                return true;
            })
            .join(', ');
    };

    const formatCityLabel = (city) => {
        const context = getLocationContext(city);

        return context ? `${city.name}, ${context}` : city.name;
    };

    const activeQuery = selectedCity && input === formatCityLabel(selectedCity) ? '' : input;
    const { suggestions, loadingCity } = useCityAutocomplete(activeQuery);

    const hasQuery = Boolean(activeQuery.trim());
    const showNoResults = hasQuery && !loadingCity && suggestions.length === 0;
    const showDropdown = hasQuery && (loadingCity || suggestions.length > 0 || showNoResults);

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

    async function handleSearch() {
        if (!selectedCity) {
            return;
        }

        await searchWeather(selectedCity);
    }

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
                            {loadingCity ? (
                                <li className="flex justify-start px-3 py-2 text-sm rounded-md text-neutral-0">
                                    Loading...
                                </li>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((city) => (
                                    <li key={`${city.id}-${city.latitude}-${city.longitude}`}>
                                        <button
                                            type="button"
                                            className="flex flex-col items-start w-full px-3 py-2 text-left transition rounded-md hover:bg-neutral-600 text-neutral-0"
                                            onClick={() => handleSelectCity(city)}
                                        >
                                            <span className="text-sm">{city.name}</span>
                                            <span className="text-xs text-neutral-300">
                                                {[getFeatureLabel(city.feature_code), getLocationContext(city)]
                                                    .filter(Boolean)
                                                    .join(' | ')}
                                            </span>
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
                <button 
                    onClick={handleSearch} 
                    disabled={!selectedCity || loading}
                    className={`px-6 py-2.5 transition rounded-md bg-blue-500 text-neutral-0 ${(!selectedCity || loading) ? '' : 'hover:bg-blue-700'}`}>
                    {loading ? "Loading..." : "Search"}
                </button>
            </div>
        </header>
    )
}

export default Header
