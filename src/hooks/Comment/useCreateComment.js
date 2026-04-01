import { useState } from "react";
import axios from "axios";

function useCreateComment(postId, refetch) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        comment_text: comment
      });

      setComment("");

      if (refetch) {
        refetch();
      }

    } catch (error) {

      console.error("CREATE COMMENT ERROR:", error);

    } finally {

      setIsSubmitting(false);

    }

  };

  return {
    comment,
    handleChange,
    handleSubmit,
    isSubmitting
  };
}

export default useCreateComment;