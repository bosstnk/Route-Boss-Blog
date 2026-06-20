import { useState } from "react";
import axios from "axios";
import { showToast } from "@/components/common/showToast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useCreateComment(postId, refetch) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, {
        comment_text: comment,
      });

      setComment("");

      if (refetch) {
        refetch();
      }
    } catch (error) {
      const msg = error.response?.data?.message;
      showToast({
        title: msg || "Failed to post comment",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    comment,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}

export default useCreateComment;
