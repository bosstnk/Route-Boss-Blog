import { useState } from "react";
import axios from "axios";

function useToggleLike(postId, setPost) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = async () => {

    if (!postId) return;

    setIsLoading(true);

    try {

      const res = await axios.post(`${API_BASE_URL}/posts/${postId}/like`);

      const { liked, likes_count } = res.data;

      setPost((prev) => ({
        ...prev,
        likes_count,
        liked
      }));

    } catch (error) {

      console.error("LIKE ERROR:", error);

    } finally {

      setIsLoading(false);

    }

  };

  return {
    toggleLike,
    isLoading
  };
}

export default useToggleLike;