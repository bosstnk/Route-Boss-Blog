import { useEffect, useState } from "react";
import axios from "axios";

export default function usePost(postId) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_BASE_URL}/posts/${postId}`);
        setPost(res.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, isLoading, isError };
}
