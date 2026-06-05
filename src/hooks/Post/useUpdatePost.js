import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "@/components/common/showToast";
import { validateUpdatePostForm } from "@/utils/validateForm";

function useUpdatePost(postId) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const updatePost = async ({ form, imageFile, status_id }) => {
    const frontendErrors = {
      ...validateUpdatePostForm(form),
      ...(fieldErrors.image ? { image: fieldErrors.image } : {}),
    };

    if (Object.keys(frontendErrors).length > 0) {
      setFieldErrors(frontendErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("category_id", form.category_id);
      formData.append("status_id", status_id);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(`${API_BASE_URL}/posts/${postId}`, formData);

      showToast({
        title: "Success",
        description: "Article updated successfully",
        type: "success",
      });

      navigate("/admin/article-management");
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        setFieldErrors(data.errors);
      } else {
        showToast({
          title: data?.message || "Something went wrong",
          description: "Please try again later",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { updatePost, isSubmitting, fieldErrors, setFieldErrors };
}

export default useUpdatePost;
