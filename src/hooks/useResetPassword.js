import { useState } from "react";
import axios from "axios";

function useResetPassword() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ✏️ handle input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 🔐 submit reset password
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // ✅ frontend validation
    if (!form.currentPassword || !form.newPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.put(`${API_BASE_URL}/user/reset-password`, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess(true);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err);
      setError(
        err.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    error,
    success,
  };
}

export default useResetPassword;