import { useEffect, useState } from "react";
import axios from "axios";

function useComments(postId) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchComments = async () => {

    setIsLoading(true);
    setIsError(false);

    try {

      const response = await axios.get(
        `${API_BASE_URL}/posts/${postId}/comments`
      );

      setComments(response.data);

    } catch (error) {

      setIsError(true);

    } finally {

      setIsLoading(false);

    }
  };

  useEffect(() => {

    if (postId) {
      fetchComments();
    }

  }, [postId]);

  return {
    comments,
    isLoading,
    isError,
    refetch: fetchComments
  };
}

export default useComments;