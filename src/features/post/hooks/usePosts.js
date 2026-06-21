import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function usePosts({ category, keyword, limit = 6 }) {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // reset page เมื่อ filter เปลี่ยน
  useEffect(() => {
    setPage(1);
  }, [category, keyword]);

  // fetch เมื่อ page / filter / refetch เปลี่ยน
  useEffect(() => {

    let ignore = false;

    const fetchPosts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const categoryParam =
          !category || category === "Highlight" ? undefined : category;

        const response = await axios.get(`${API_BASE_URL}/posts`, {
          params: {
            page,
            limit,
            category: categoryParam,
            keyword: keyword || undefined,
          },
        });

        if (ignore) return;

        const data = response.data;

        setPosts((prev) =>
          page === 1 ? (data.posts ?? []) : [...prev, ...(data.posts ?? [])]
        );

        setHasMore(data.currentPage < data.totalPages);

      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      ignore = true;
    };

  }, [page, category, keyword, limit, refetchIndex]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const reset = () => {
    setPosts([]);
    setPage(1);
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

export default usePosts;
