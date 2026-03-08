import { useState } from "react";
import axios from "axios";
import { validateLoginForm } from "@/utils/validateForm";
import { useAuth } from "@/context/AuthContext";

export function useLogInForm() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { login } = useAuth();

  const [loginForm, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  function inputForm(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function requestLogin() {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginForm
      );

      // ⭐ ส่ง token ให้ AuthContext
      login(res.data.token);

      setIsSuccess(true);
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong"
      );
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
    inputForm,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    serverError,
  };
}
