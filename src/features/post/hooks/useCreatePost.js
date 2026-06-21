import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "@/shared/components/common/showToast";
import { validateCreatePostForm } from "@/shared/utils/validateForm";

function useCreatePost() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category_id: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  // select category
  const handleCategoryChange = (value) => {
    setForm((prev) => ({
      ...prev,
      category_id: Number(value),
    }));
    setFieldErrors((prev) => ({ ...prev, category_id: null }));
  };

  // upload thumbnail (client-side validation + ไม่ stage ไฟล์เสีย)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    setFieldErrors((prev) => ({ ...prev, image: null }));

    if (!allowedTypes.includes(file.type)) {
      setFieldErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG, WEBP are allowed",
      }));
      return;
    }

    if (file.size > maxSize) {
      setFieldErrors((prev) => ({
        ...prev,
        image: "Image must be less than 2MB",
      }));
      return;
    }

    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  // submit (draft / publish)
  const submitPost = async ({ publish }) => {
    const frontendErrors = {
      ...validateCreatePostForm(form, imageFile),
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
      formData.append("status_id", publish ? 2 : 1); // 1=Draft, 2=Published
      formData.append("imageFile", imageFile);

      await axios.post(`${API_BASE_URL}/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast({
        title: "Success",
        description: "Article created successfully",
        type: "success",
      });

      navigate("/admin/article-management");
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        setFieldErrors(data.errors);
      } else {
        showToast({
          title: "Something went wrong",
          description: "Please try again later",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    imagePreview,
    isSubmitting,
    fieldErrors,
    handleChange,
    handleCategoryChange,
    handleImageChange,
    submitPost,
  };
}

export default useCreatePost;
