import { useState } from "react";
import axios from "axios";

function useUpdatePost(postId) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePost = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", data.content);
      formData.append("category_id", data.category_id);
      formData.append("status_id", data.status_id);


      if (data.imageFile) {
        formData.append("imageFile", data.imageFile);
      }

      await axios.put(`${API_BASE_URL}/posts/${postId}`, formData);

      console.log("Update success");
      showToast({
        title: "Success",
        description: "Article updated successfully",
        type: "success",
      });
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      console.log(err.response?.data);
      showToast({
        title: "Success",
        description: "Article updated successfully",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return { updatePost, isSubmitting };
}

export default useUpdatePost;
