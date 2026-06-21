import { useState } from "react"
import { validateSignUpForm } from "@/shared/utils/validateForm"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialSignUpForm = {
  name: "",
  username: "",
  email: "",
  password: ""
}

export function useSignUp() {
  const navigate = useNavigate()
  const [signUpForm, setSignUpForm] = useState(initialSignUpForm)
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null);

  const { login } = useAuth()

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
      const res = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      await login(res.data.token);
      navigate("/signup-success");
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
      } else {
        setServerError(data?.message || "Unable to connect to the server. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedForm = {
      ...signUpForm,
      email: signUpForm.email.toLowerCase().trim(),
    };

    const validateErrors = validateSignUpForm(normalizedForm);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) return;

    await Register(normalizedForm);
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
