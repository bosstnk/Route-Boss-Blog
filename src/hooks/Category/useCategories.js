import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useCategories(keyword) {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = () => setRefetchIndex((n) => n + 1);

    useEffect(() => {

        let ignore = false;

        const getCategories = async () => {

            setIsLoading(true);
            setIsError(false);

            try {

                const res = await axios.get(`${API_BASE_URL}/categories`, {
                    params: { keyword }
                });

                if (!ignore) setCategories(res.data);

            } catch {

                if (!ignore) setIsError(true);

            } finally {

                if (!ignore) setIsLoading(false);

            }

        };

        getCategories();

        return () => {
            ignore = true;
        };

    }, [keyword, refetchIndex]);

    return {
        categories,
        isLoading,
        isError,
        refetch
    };
}

export default useCategories;
