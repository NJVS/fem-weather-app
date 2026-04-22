import { useEffect, useRef, useState } from "react";

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
                    count: "5",
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
                const results = data.results || [];

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
