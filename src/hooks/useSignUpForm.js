import { useState } from "react"
import { validateSignUpForm } from "@/utils/validateSignUpForm"

const initialSignUpForm = {
    name:"",
    username:"",
    email:"",
    password:""
}

export function useSingUpForm() {
    const [singUpForm,setSignUpForm] = useState(initialSignUpForm)
    const [errors,setErrors] = useState({})
    const [isSucess,setIsSucess] = useState(false)

    function inputForm(e) {
        const {name , value} = e.target
        setSignUpForm((prev) => ({...prev,[name]:value}))
    }

    function handleSubmit() {
        return (e) => {
        e.preventDefault();
        const validateErrors = validateSignUpForm(singUpForm)
        setErrors(validateErrors)

        if (Object.keys(validateErrors).length > 0) return;
        setIsSucess(true)
        }
    }
    return {singUpForm, inputForm, handleSubmit, errors, isSucess}
}
