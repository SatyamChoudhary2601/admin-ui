import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const fetchFunction = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(url)
            localStorage.setItem('userData', JSON.stringify(response.data))
            setData(response.data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchFunction()
    }, [url])
    return { isLoading, data, error }
}

export default useFetch;