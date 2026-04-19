import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/components/common/showToast";

function useCreateCategory() {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const inputChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async () => {

        if (!name.trim()) return;

        setIsLoading(true);
        setError(null);

        try {

            await axios.post(`${API_BASE_URL}/categories`, { name });

            showToast({
                title: "Success",
                description: "Category has been successfully created.",
                type: "success",
            });

            navigate("/admin/category-management");

        } catch (err) {

            const message = err.response?.data?.message || "Create category failed";
            setError(message);
            showToast({
                title: "Error",
                description: message,
                type: "error",
            });

        } finally {

            setIsLoading(false);

        }

    };

    return {
        name,
        inputChange,
        handleSubmit,
        isLoading,
        error
    };
}

export default useCreateCategory;
