import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

            await axios.post(`${API_BASE_URL}/categories`, {
                name
            });

            navigate("/admin/category-management");

        } catch (err) {

            setError(err.response?.data?.message || "Create category failed");

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