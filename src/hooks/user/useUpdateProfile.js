import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { validateUpdateProfileForm } from "@/utils/validateForm";
import { showToast } from "@/components/common/showToast";

export default function useUpdateProfile() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { profile: authProfile, fetchProfile } = useAuth();

  const [form, setForm] = useState({
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // sync profile → form
  useEffect(() => {
    if (authProfile) {
      setForm({
        image: authProfile.image || "",
        name: authProfile.name || "",
        username: authProfile.username || "",
        email: authProfile.email || "",
        bio: authProfile.bio || "",
      });
    }
  }, [authProfile]);

  useEffect(() => {
    let currentUrl = form.image;
  
    return () => {
      if (currentUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [form.image]);

  // input
  function handleChange(e) {
    const { name, value } = e.target;

    // 🔒 limit bio
    if (name === "bio" && value.length > 120) return;

    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  }

  // upload image
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    // reset error ก่อน
    setFieldErrors((prev) => ({ ...prev, image: null }));

    // ❌ type ไม่ถูก
    if (!allowedTypes.includes(file.type)) {
      setFieldErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG, WEBP are allowed",
      }));
      return;
    }

    // ❌ size เกิน
    if (file.size > maxSize) {
      setFieldErrors((prev) => ({
        ...prev,
        image: "Image must be less than 2MB",
      }));
      return;
    }

    // ✅ ผ่าน
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: previewUrl }));
  }

  // submit
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setFieldErrors({});

    const frontendErrors = {
      ...validateUpdateProfileForm(form),
      ...(fieldErrors.image ? { image: fieldErrors.image } : {})
    };
    
    if (Object.keys(frontendErrors).length > 0) {
      setFieldErrors(frontendErrors);
      setIsLoading(false);
      return;
    }

    try {
      
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("bio", form.bio);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(`${API_BASE_URL}/user`, formData);

      showToast({
        title: "Saved profile",
        description: "Your profile has been successfully updated",
        type: "success",
      });

      await fetchProfile();

    } catch (err) {
      const status = err.response?.status;

      if (status === 400 && err.response?.data?.errors) {
        // 🔥 map backend errors
        setFieldErrors(err.response.data.errors);

      } else {
        showToast({
          title: "Something went wrong",
          description: "Please try again later",
          type: "error",
        });
      }

    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    isLoading,
    fieldErrors,
  };
}
