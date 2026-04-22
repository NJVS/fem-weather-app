import { useEffect, useRef, useState } from "react";

const FEATURE_SCORES = { // api keys
    PPLC: 130,
    PPLG: 120,
    PPLA: 115,
    PPLA2: 110,
    PPLA3: 105,
    PPLA4: 100,
    PPLA5: 95,
    PPL: 90,
    PPLL: 85,
    PPLX: 80,
    ADM5: 45,
    ADM4: 40,
    ADM3: 35,
    ADM2: 30,
    ADM1: 25,
    ADMD: 20,
};

function normalizeValue(value) {
    return String(value ?? "").trim().toLowerCase();
}

function getFeatureScore(featureCode) {
    if (!featureCode) {
        return 0;
    }

    if (featureCode in FEATURE_SCORES) {
        return FEATURE_SCORES[featureCode];
    }

    if (featureCode.startsWith("PPL")) {
        return 75;
    }

    if (featureCode.startsWith("ADM")) {
        return 15;
    }

    return 0;
}

function getPopulationScore(population) {
    if (!Number.isFinite(population) || population <= 0) {
        return 0;
    }

    return Math.min(Math.log10(population) * 8, 40);
}

function scoreSuggestion(location, query) {
    const normalizedName = normalizeValue(location.name);
    const normalizedQuery = normalizeValue(query);

    let score = 0;

    if (normalizedName === normalizedQuery) {
        score += 300;
    } else if (normalizedName.startsWith(normalizedQuery)) {
        score += 180;
    } else if (normalizedName.includes(normalizedQuery)) {
        score += 90;
    }

    const matchedTokens = normalizedQuery
        .split(/\s+/)
        .filter(Boolean)
        .filter((token) => normalizedName.includes(token)).length;

    score += matchedTokens * 15;
    score += getFeatureScore(location.feature_code);
    score += getPopulationScore(location.population);

    if (location.feature_code?.startsWith("ADM")) {
        score -= 60;
    }

    return score;
}

function rankSuggestions(results, query) {
    return [...results]
        .sort((first, second) => {
            const scoreDifference = scoreSuggestion(second, query) - scoreSuggestion(first, query);

            if (scoreDifference !== 0) {
                return scoreDifference;
            }

            const populationDifference = (second.population ?? 0) - (first.population ?? 0);

            if (populationDifference !== 0) {
                return populationDifference;
            }

            return String(first.name ?? "").localeCompare(String(second.name ?? ""));
        })
        .slice(0, 5);
}

export function useCityAutocomplete(query, delay = 300) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const cache = useRef({});
    const controller = useRef(null);

    useEffect(() => {
        const q = String(query ?? "").trim().toLowerCase();

        if (controller.current) {
            controller.current.abort();
            controller.current = null;
        }

        const timerDelay = !q || cache.current[q] ? 0 : delay;

        const timer = setTimeout(async () => {
            if (!q) {
                setSuggestions([]);
                setLoading(false);
                return;
            }

            if (cache.current[q]) {
                setSuggestions(cache.current[q]);
                setLoading(false);
                return;
            }

            const nextController = new AbortController();
            controller.current = nextController;

            try {
                setLoading(true);

                const params = new URLSearchParams({
                    name: q,
                    count: "15",
                    language: "en",
                });

                const res = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`,
                    { signal: nextController.signal }
                );

                if (!res.ok) {
                    throw new Error(`Autocomplete request failed with status ${res.status}`);
                }

                const data = await res.json();
                const results = rankSuggestions(data.results || [], q);

                cache.current[q] = results;

                if (controller.current === nextController) {
                    setSuggestions(results);
                }

            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);

                    if (controller.current === nextController) {
                        setSuggestions([]);
                    }
                }
            } finally {
                if (controller.current === nextController) {
                    setLoading(false);
                    controller.current = null;
                }
            }
        }, timerDelay);

        return () => {
            clearTimeout(timer);

            if (controller.current) {
                controller.current.abort();
                controller.current = null;
            }
        };
    }, [query, delay]);

    return { suggestions, loading };
}
