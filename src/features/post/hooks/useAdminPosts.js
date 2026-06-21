import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useAdminPosts({ category, keyword, status, limit = 20 }) {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Filter changes or reset → replace with page 1 results
  useEffect(() => {
    let ignore = false;
    setPage(1);

    const fetch = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const categoryParam = !category || category === "all" ? undefined : category;
        const statusParam = !status || status === "all" ? undefined : status;
        const response = await axios.get(`${API_BASE_URL}/admin/posts`, {
          params: {
            page: 1,
            limit,
            category: categoryParam,
            keyword: keyword || undefined,
            status: statusParam,
          },
        });
        const data = response.data;
        if (!ignore) {
          setPosts(data.posts);
          setHasMore(data.currentPage < data.totalPages);
        }
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetch();
    return () => { ignore = true; };
  }, [category, keyword, status, limit, refetchIndex]);

  // Pagination — append next page
  useEffect(() => {
    if (page <= 1) return;
    let ignore = false;

    const fetch = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const categoryParam = !category || category === "all" ? undefined : category;
        const statusParam = !status || status === "all" ? undefined : status;
        const response = await axios.get(`${API_BASE_URL}/admin/posts`, {
          params: {
            page,
            limit,
            category: categoryParam,
            keyword: keyword || undefined,
            status: statusParam,
          },
        });
        const data = response.data;
        if (!ignore) {
          setPosts((prev) => [...prev, ...data.posts]);
          setHasMore(data.currentPage < data.totalPages);
        }
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetch();
    return () => { ignore = true; };
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const reset = () => {
    setPosts([]);
    setRefetchIndex((n) => n + 1);
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
