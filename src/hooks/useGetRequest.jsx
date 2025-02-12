import React from 'react';

const useGetRequest = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);

    const getData = async (url) => {
        setLoading(true);
        setError(null); // Limpiamos errores previos
        setResponse(null); // Limpiamos respuesta previa

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }

            const result = await res.json();
            setResponse(result);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { getData, loading, error, response };
};

export default useGetRequest;
