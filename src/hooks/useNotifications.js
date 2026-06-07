import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex((n) => n + 1);

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    let ignore = false;

    const fetchNotifications = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await axios.get(`${API_BASE_URL}/notifications`);
        if (!ignore) setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchNotifications();

    return () => {
      ignore = true;
    };

  }, [refetchIndex]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const interval = setInterval(() => {
      setRefetchIndex((n) => n + 1);
    }, 20_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setRefetchIndex((n) => n + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAllAsRead = async () => {
    if (unreadCount === 0) return;

    // optimistic update — set is_read=true ทั้งหมด ทันที
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));

    try {
      await axios.patch(`${API_BASE_URL}/notifications/read-all`);
    } catch {
      // ถ้าพัง refetch มา reconcile state กับ DB
      refetch();
    }
  };

  return {
    notifications,
    isLoading,
    isError,
    unreadCount,
    markAllAsRead,
    refetch,
  };
}

export default useNotifications;
