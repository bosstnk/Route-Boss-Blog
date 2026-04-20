import { useEffect, useState } from "react";
import axios from "axios";

function useAdminPosts({ category, keyword, limit = 20 }) {
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
        !category || category === "all" ? undefined : category;

      const response = await axios.get(`${API_BASE_URL}/admin/posts`, {
        params: {
          page: targetPage,
          limit,
          category: categoryParam,
          keyword: keyword || undefined,
        },
      });

      const data = response.data;

      setPosts((prev) =>
        targetPage === 1 ? data.posts : [...prev, ...data.posts]
      );

      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    getPosts(1);
  }, [category, keyword]);

  useEffect(() => {
    if (page > 1) {
      getPosts(page);
    }
  }, [page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
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

export default useAdminPosts;
