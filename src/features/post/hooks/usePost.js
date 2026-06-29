import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function usePost(postId) {

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex((n) => n + 1);

  useEffect(() => {

    if (!postId) return;

    let ignore = false;

    const fetchPost = async () => {

      setIsLoading(true);
      setIsError(false);

      try {

        const res = await axios.get(`${API_BASE_URL}/posts/${postId}`);

        if (!ignore) setPost(res.data);

      } catch {

        if (!ignore) setIsError(true);

      } finally {

        if (!ignore) setIsLoading(false);

      }

    };

    fetchPost();

    return () => {
      ignore = true;
    };

  }, [postId, refetchIndex]);

  return {
    post,
    setPost,
    isLoading,
    isError,
    refetch
  };
}

export default usePost;
