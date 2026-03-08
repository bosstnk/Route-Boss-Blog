import axios from "axios";
import { useState } from "react";

function useDeleteCategory(refetch) {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id) => {

        setIsLoading(true);

        try {

            await axios.delete(`${API_BASE_URL}/categories/${id}`);

            refetch();

        } catch (error) {

            console.error("Delete category failed", error);

        } finally {

            setIsLoading(false);

        }

    };

    return {
        handleDelete,
        isLoading
    };
}

export default useDeleteCategory;