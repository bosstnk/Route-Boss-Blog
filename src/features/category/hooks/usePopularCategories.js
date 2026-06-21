import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// หมวดหมู่เรียงตามจำนวนโพสต์ (Published) มาก→น้อย — backend จัดเรียงมาแล้ว
function usePopularCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const getPopularCategories = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await axios.get(`${API_BASE_URL}/categories/popular`);
        if (!ignore) setCategories(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    getPopularCategories();

    return () => {
      ignore = true;
    };
  }, []);

  return { categories, isLoading, isError };
}

export default usePopularCategories;
