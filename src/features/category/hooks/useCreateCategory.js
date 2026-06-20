import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/components/common/showToast";
import { validateCategoryForm } from "@/utils/validateForm";

function useCreateCategory() {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setName(e.target.value);
        setErrors((prev) => ({ ...prev, name: "" }));
    };

    const handleSubmit = async () => {

        const validateErrors = validateCategoryForm({ name });
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length > 0) return;

        setIsLoading(true);

        try {

            await axios.post(`${API_BASE_URL}/categories`, { name });

            showToast({
                title: "Success",
                description: "Category has been successfully created.",
                type: "success",
            });

            navigate("/admin/category-management");

        } catch (error) {

            const data = error.response?.data;

            if (data?.errors) {
                setErrors(data.errors);
            } else {
                showToast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    type: "error",
                });
            }

        } finally {

            setIsLoading(false);

        }

    };

    return {
        name,
        handleChange,
        handleSubmit,
        isLoading,
        errors
    };
}

export default useCreateCategory;
