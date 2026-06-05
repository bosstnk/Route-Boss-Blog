import axios from "axios";
import { useState } from "react";
import { showToast } from "@/components/common/showToast";

function useDeletePost() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isDeleting, setIsDeleting] = useState(false);

  const deletePost = async (postId) => {
    setIsDeleting(true);

    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);

      showToast({
        title: "Success",
        description: "Article deleted successfully",
        type: "success",
      });

      return true;
    } catch (err) {
      showToast({
        title: err.response?.data?.message || "Something went wrong",
        description: "Please try again later",
        type: "error",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting };
}

export default useDeletePost;
