import axios from "axios";
import { useState } from "react";

function useDeletePost() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isDeleting, setIsDeleting] = useState(false);

  const deletePost = async (postId) => {
    setIsDeleting(true);

    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      console.log("Delete success");
      return true; // 👈 เอาไว้ refresh
    } catch (err) {
      console.error("DELETE ERROR:", err);
      console.log(err.response?.data);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting };
}

export default useDeletePost;