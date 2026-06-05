import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "@/components/common/showToast";
import { validateCategoryForm } from "@/utils/validateForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useEditCategory() {

  const { categoryId } = useParams();
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

      await axios.put(`${API_BASE_URL}/categories/${categoryId}`, { name });

      showToast({
        title: "Success",
        description: "Category updated successfully",
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

  useEffect(() => {

    let ignore = false;

    const getCategory = async () => {

      try {

        const res = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);

        if (!ignore) setName(res.data.name);

      } catch (error) {

        if (ignore) return;

        showToast({
          title: error.response?.data?.message || "Something went wrong",
          description: "Returning to category management",
          type: "error",
        });

        navigate("/admin/category-management");

      }

    };

    getCategory();

    return () => {
      ignore = true;
    };

  }, [categoryId, navigate]);

  return {
    name,
    handleChange,
    handleSubmit,
    isLoading,
    errors
  };
}

export default useEditCategory;
