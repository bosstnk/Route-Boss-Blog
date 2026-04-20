import { useEffect, useState } from "react";
import axios from "axios";

function usePosts({ category, keyword, limit = 6 }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async (targetPage = page) => {

    setIsLoading(true);
    setIsError(false);

    try {

      const categoryParam =
        !category || category === "Highlight" ? undefined : category;

      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          page: targetPage,
          limit,
          category: categoryParam,
          keyword: keyword || undefined
        },
      });

      const data = response.data;

      setPosts(prev =>
        targetPage === 1 ? (data.posts ?? []) : [...prev, ...(data.posts ?? [])]
      );

      setHasMore(data.currentPage < data.totalPages);

    } catch (error) {

      setIsError(true);

    } finally {

      setIsLoading(false);

    }

  };

  useEffect(() => {
    getPosts(page);
  }, [page, category, keyword]);

  const loadMore = () => {

    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }

  };

  const reset = () => {
    setPosts([]);
    setPage(1);
    getPosts(1);
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
