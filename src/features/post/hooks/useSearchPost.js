import axios from "axios"
import { useEffect, useState } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useSuggestions (keyword) {
    const [state,setState] = useState({
        suggestions: [],
        isLoading: false,
        isError: false
    })

    // keyword ถูกลบจนว่าง → ล้าง suggestions ตอน render เลย (ไม่ต้องรอ effect)
    const [prevKeyword, setPrevKeyword] = useState(keyword)
    if (keyword !== prevKeyword) {
        setPrevKeyword(keyword)
        if (keyword.trim().length === 0) {
            setState({suggestions:[] ,isLoading:false, isError:false})
        }
    }

    useEffect(() => {
        if (keyword.trim().length === 0) return

        const fetchSuggestions = async () => {
            setState((prev) => ({...prev, isLoading: true, isError: false}))
            try {
                const responsive = await axios.get(`${API_BASE_URL}/posts`, { params: { keyword }})
                setState({suggestions: responsive.data.posts ?? [], isLoading: false, isError: false})
            } catch {
                setState({suggestions:[] ,isLoading:false, isError:true})
            }
        }
        fetchSuggestions()
    },[keyword])

    return state
}