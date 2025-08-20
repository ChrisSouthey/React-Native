import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '2c4b58026bfb4d328bd164057252008';
const LOCATION = '02818';

export const useWeather = (endpoint: 'current' | 'forecast', days?: number) => {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = `http://api.weatherapi.com/v1/${endpoint}.json?q=${LOCATION}&key=${API_KEY}`;

                if (endpoint === 'forecast' && days) {
                    url += `&days=${days}`;
                }

                const response = await axios.get(url);
                setWeather(response.data);
            } catch (err: any) {
                console.error('Error fetching weather:', err);
                setError(err.message || 'Failed to fetch weather data.');
                setWeather(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [endpoint, days]);

    return { weather, loading, error };
};

