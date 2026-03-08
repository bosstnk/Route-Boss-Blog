import { useState } from "react"
import { validateSignUpForm } from "@/utils/validateForm"
import axios from "axios"

const initialSignUpForm = {
    name:"",
    username:"",
    email:"",
    password:""
}

export function useSignUpForm() {
    const [signUpForm,setSignUpForm] = useState(initialSignUpForm)
    const [errors,setErrors] = useState({})
    const [isSuccess,setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    function inputForm(e) {
        const {name , value} = e.target
        setSignUpForm((prev) => ({...prev,[name]:value}))
        setServerError(null);
    }

    async function requestRegister() {
        setIsLoading(true);
        setServerError(null);
    
        try {
          await axios.post(`${API_BASE_URL}/auth/register`, signUpForm);
          setIsSuccess(true);
        } catch (error) {
          if (error.response) {
            setServerError(error.response.data.message);
          } else {
            setServerError(`Something went wrong`);
          }
        } finally {
          setIsLoading(false);
        }
      }

      function handleSubmit() {
        return async (e) => {
          e.preventDefault();
    
          const validateErrors = validateSignUpForm(signUpForm);
          setErrors(validateErrors);
    
          if (Object.keys(validateErrors).length > 0) return;
    
          await requestRegister();
        };
      }
      return {
        signUpForm,
        inputForm,
        handleSubmit,
        errors,
        isSuccess,
        isLoading,
        serverError,
      };
}
