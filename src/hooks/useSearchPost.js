import axios from "axios"
import { useEffect, useState } from "react"


export function useSuggestions (keyword) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [state,setState] = useState({
        suggestions: [],
        isLoading: false,
        isError: false
    })
    useEffect(() => {
        if (keyword.trim().length > 0) {
            const fetchSuggestions = async () => {
                setState((prev) => ({...prev, isLoading: true, isError: false}))
                try {
                    const responsive = await axios.get(`${API_BASE_URL}/posts?keyword=${keyword}`)
                    setState({suggestions: responsive.data.posts ?? [], isLoading: false, isError: false})
                    console.log(state)
                } catch (error) {
                    setState({suggestions:[] ,isLoading:false, isError:false})
                }
            }
            console.log("keyword changed:", keyword);
            fetchSuggestions()
        } else {
            setState({suggestions:[] ,isLoading:false, isError:false})
        }
    },[keyword])

    return state
}