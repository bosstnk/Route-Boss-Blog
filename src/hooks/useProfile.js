import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

function useProfile() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { profile: authProfile, setProfile: setAuthProfile } = useAuth();

  // 📝 form state
  const [form, setForm] = useState({
    image: "",
    name: "",
    username: "",
    email: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // 🔁 sync context profile → form
  useEffect(() => {
    if (authProfile) {
      setForm({
        image: authProfile.image || "",
        name: authProfile.name || "",
        username: authProfile.username || "",
        email: authProfile.email || "",
      });
    }
  }, [authProfile]);

  // ✏️ handle text input
  function inputProfile(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 🖼️ handle image
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // preview รูป
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: previewUrl }));
  }

  // 💾 submit update
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(`${API_BASE_URL}/user`, formData);

      // 🔄 refetch profile หลัง update
      const result = await axios.get(`${API_BASE_URL}/user`);
      setAuthProfile(result.data);
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  }

  return {
    form,
    inputProfile,
    handleFileChange,
    handleSubmit,
    isSaving,
    error,
  };
}

export default useProfile;