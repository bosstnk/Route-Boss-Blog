import { useState } from "react";
import axios from "axios";
import { showToast } from "@/components/common/showToast";
import { validateResetPasswordForm } from "@/utils/validateForm";

function useResetPassword() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // ✏️ handle input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  }

  // 🔐 submit reset password
  async function handleSubmit(e) {
    e?.preventDefault()

    const errors = validateResetPasswordForm(form);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      await axios.put(`${API_BASE_URL}/user/reset-password`, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      });

      showToast({
        title: "Reseted Password",
        description: "Your password has been successfully reseted",
        type: "success",
      });

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
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
    handleSubmit,
    isLoading,
    fieldErrors
  };
}

export default useResetPassword;