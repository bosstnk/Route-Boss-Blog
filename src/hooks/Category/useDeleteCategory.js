import axios from "axios";
import { useState } from "react";
import { showToast } from "@/components/common/showToast";

function useDeleteCategory(refetch) {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id) => {

        setIsLoading(true);

        try {

            await axios.delete(`${API_BASE_URL}/categories/${id}`);

            showToast({
                title: "Success",
                description: "Category deleted successfully",
                type: "success",
            });

            refetch();

        } catch (error) {

            showToast({
                title: "Error",
                description: error.response?.data?.message || "Delete category failed",
                type: "error",
            });

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
