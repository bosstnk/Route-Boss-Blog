import { useEffect, useState } from "react";
import axios from "axios";

function useCategories(keyword) {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getCategories = async () => {

        setIsLoading(true);
        setIsError(false);

        try {

            const res = await axios.get(`${API_BASE_URL}/categories`, {
                params: { keyword }
            });

            setCategories(res.data);

        } catch (error) {

            setIsError(true);

        } finally {

            setIsLoading(false);

        }

    };

    useEffect(() => {
        getCategories();
    }, [keyword]);

    return {
        categories,
        isLoading,
        isError,
        refetch: getCategories
    };
}

export default useCategories;