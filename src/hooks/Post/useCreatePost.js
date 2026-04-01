import { useState } from "react";
import axios from "axios";

function useCreatePost() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category_id: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // select category
  const handleCategoryChange = (value) => {

    setForm((prev) => ({
      ...prev,
      category_id: Number(value)
    }));

  };

  // upload thumbnail
  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

  };

  // submit (draft / publish)
  const submitPost = async ({ publish }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("category_id", form.category_id);
      formData.append("status_id", publish ? 2 : 1); // 1=draft, 2=publish

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }
      // 👇 log ตรงนี้
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await axios.post(`${API_BASE_URL}/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("CREATE POST ERROR:", err);
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Failed to create post");

    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    imagePreview,
    isSubmitting,
    error,
    handleChange,
    handleCategoryChange,
    handleImageChange,
    submitPost
  };
}

export default useCreatePost;