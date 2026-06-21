import { useState } from "react";
import axios from "axios";
import { validateLoginForm } from "@/shared/utils/validateForm";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/shared/components/common/showToast";

export function useLogIn() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { login } = useAuth();

  const [loginForm, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function requestLogin() {
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginForm
      );

      await login(res.data.token);
    } catch (error) {
      const data = error.response?.data;
      const status = error.response?.status;

      if (data?.errors) {
        setErrors(data.errors);
      } else if (status === 401) {
        showToast({
          title: data?.message || "Invalid email or password",
          description: "Please check your credentials and try again.",
          type: "error",
        });
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

  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validateLoginForm(loginForm);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) return;

    requestLogin();
  }

  return {
    loginForm,
    handleChange,
    handleSubmit,
    errors,
    isLoading,
  };
}
