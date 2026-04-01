import { useEffect, useState } from "react";
import axios from "axios";

function useNotifications() {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {

    try {

      const res = await axios.get(
        `${API_BASE_URL}/admin/notifications`
      );

      setNotifications(res.data);

    } catch (error) {

      console.error("NOTIFICATION ERROR", error);

    } finally {

      setIsLoading(false);

    }

  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    isLoading
  };

}

export default useNotifications;