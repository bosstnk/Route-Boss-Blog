import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex((n) => n + 1);

  useEffect(() => {
    if (!postId) return;
    let ignore = false;

    const fetch = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
        if (!ignore) setComments(response.data);
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetch();
    return () => { ignore = true; };
  }, [postId, refetchIndex]);

  return { comments, isLoading, isError, refetch };
}

export default useComments;
