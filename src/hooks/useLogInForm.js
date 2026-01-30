import { useState } from "react";
import { userDemo } from "@/data/userIDDemo";

export function useLogInForm() {
  const [hasError, setHasError] = useState(false);
  const [isSucess, setIsSucess] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function inputForm(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      form.email === userDemo.email &&
      form.password === userDemo.password
    ) {
      setHasError(false);
      setIsSucess(true)
    } else {
      setHasError(true);
    }
  }

  return { inputForm, handleSubmit,isSucess, hasError };
}