import { useEffect, useState } from "react";
import axios from "axios";

function usePosts({ category, keyword, limit = 6 }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const categoryParam =
        !category || category === "all" ? undefined : category;

      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          page,
          limit,
          category: categoryParam,
        },
      });

      const data = response.data;

      setPosts((prev) =>
        page === 1 ? data.posts : [...prev, ...data.posts]
      );

      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getPosts();
  }, [page, category, limit]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const reset = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  return {
    posts,
    isLoading,
    isError,
    hasMore,
    loadMore,
    reset,
  };
}


export default usePosts;
