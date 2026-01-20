import axios from "axios"
import { useEffect, useState } from "react"

export function useKeyword() {
    const [keyword,setKeyword] = useState("")
    return {keyword,setKeyword}
}

export function useSuggestions (keyword) {
    const [state,setState] = useState({
        suggestions: [],
        isLoading: false,
        isError: false
    })
    console.log(keyword)
    useEffect(() => {
        if (keyword.trim().length > 0) {
            const fetchSuggestions = async () => {
                setState((prev) => ({...prev, isLoading: true, isError: false}))
                try {
                    const responsive = await axios.get(`https://blog-post-project-api.vercel.app/posts?keyword=${keyword}`)
                    setState({suggestions: responsive.data.posts, isLoading: false, isError: false})
                    console.log(state)
                } catch (error) {
                    setState({suggestions:[] ,isLoading:false, isError:false})
                }
            }

            fetchSuggestions()
        } else {
            setState({suggestions:[] ,isLoading:false, isError:false})
        }
    },[keyword])

    return state
}