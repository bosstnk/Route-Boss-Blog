import { useState } from "react"
import { validateSignUpForm } from "@/utils/validateSignUpForm"
import axios from "axios"

const initialSignUpForm = {
    name:"",
    username:"",
    email:"",
    password:""
}

export function useSingUpForm() {
    const [singUpForm,setSignUpForm] = useState(initialSignUpForm)
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
          await axios.post(`${API_BASE_URL}/auth/register`, singUpForm);
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
    
          const validateErrors = validateSignUpForm(singUpForm);
          setErrors(validateErrors);
    
          if (Object.keys(validateErrors).length > 0) return;
    
          await requestRegister();
        };
      }
      return {
        singUpForm,
        inputForm,
        handleSubmit,
        errors,
        isSuccess,
        isLoading,
        serverError,
      };
}
