import { useEffect, useState } from "react";
import axios from "axios";

function usePost(postId) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {

    setIsLoading(true);

    try {

      const res = await axios.get(`${API_BASE_URL}/posts/${postId}`);

      setPost(res.data);

    } catch (error) {

      console.error("FETCH POST ERROR:", error);

    } finally {

      setIsLoading(false);

    }

  };

  useEffect(() => {

    if (postId) {
      fetchPost();
    }

  }, [postId]);

  return {
    post,
    setPost,
    isLoading,
    refetch: fetchPost
  };
}

export default usePost;