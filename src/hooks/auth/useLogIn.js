import { useState } from "react";
import axios from "axios";
import { validateLoginForm } from "@/utils/validateForm";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/components/common/showToast";

export function useLogIn() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { login } = useAuth();

  const [loginForm, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function requestLogin() {
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginForm
      );

      // ⭐ ส่ง token ให้ AuthContext
      login(res.data.token);

      setIsSuccess(true);
    } catch (error) {

      const status = error.response?.status;
      const message = error.response?.data?.message;

      console.log("🔥 LOGIN ERROR:", {
        status,
        message,
      });

      if (status === 400) {
        showToast({
          title: "Your password is incorrect or this email doesn’t exist",
          description: "Please try another password or email",
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
    console.log("🔥 SUBMIT TRIGGER");
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
    isSuccess,
  };
}
