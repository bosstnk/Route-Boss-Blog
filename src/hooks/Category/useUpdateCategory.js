import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function useEditCategory() {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputChange = (e) => {
    setName(e.target.value);
  };

  // โหลดข้อมูล category
  const getCategory = async () => {

    try {

      const res = await axios.get(
        `${API_BASE_URL}/categories/${categoryId}`
      );

      setName(res.data.name);

    } catch (err) {

      console.error("Failed to fetch category", err);

    }

  };

  // update category
  const handleSubmit = async () => {

    if (!name.trim()) return;

    setIsLoading(true);

    try {

      await axios.put(
        `${API_BASE_URL}/categories/${categoryId}`,
        { name }
      );

      navigate("/admin/category-management");

    } catch (err) {

      setError("Update category failed");

    } finally {

      setIsLoading(false);

    }

  };

  useEffect(() => {
    getCategory();
  }, []);

  return {
    name,
    inputChange,
    handleSubmit,
    isLoading,
    error
  };
}

export default useEditCategory;