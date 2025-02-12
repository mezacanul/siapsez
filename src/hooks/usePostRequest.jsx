import React from 'react'
 
const usePostRequest = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const[response, setResponse] = React.useState(null)
 
    const postData = async (url, data) => {
        setLoading(true)
        setError(null) // limpiamos errores previos
        setResponse(null) // limpiamos respuesta previa
 
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
 
            if(!res.ok){ throw new Error(`Error: ${res.status} - ${res.statusText}`)}
            const result = await res.json();
            setResponse(result);
 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
 
    return { postData, loading, error, response };
}
 
export default usePostRequest