import { useState } from "react"
import { validateSignUpForm } from "@/utils/validateForm"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const initialSignUpForm = {
  name: "",
  username: "",
  email: "",
  password: ""
}

export function useSignUp() {
  const navigate = useNavigate()
  const [signUpForm, setSignUpForm] = useState(initialSignUpForm)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { login } = useAuth()

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  function handleInputChange(e) {
    const { name, value } = e.target
    setSignUpForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }))

    setServerError(null);
  }

  async function Register(payload) {
    setIsLoading(true);
    setServerError(null);

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, payload);

      const loginRes = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: payload.email,
        password: payload.password,
      });

      await login(loginRes.data.token);
      navigate("/signup-success");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    return async (e) => {
      e.preventDefault();

      const normalizedForm = {
        ...signUpForm,
        email: signUpForm.email.toLowerCase().trim(),
      };

      const validateErrors = validateSignUpForm(normalizedForm);
      setErrors(validateErrors);

      if (Object.keys(validateErrors).length > 0) return;

      await Register(normalizedForm);
    };
  }

  return {
    signUpForm,
    handleInputChange,
    handleSubmit,
    errors,
    isLoading,
    serverError,
  };
}
