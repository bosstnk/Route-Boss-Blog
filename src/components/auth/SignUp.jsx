import { useSignUp } from "@/hooks/auth/useSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { Eye, EyeClosed } from 'lucide-react';



function SignUp() {
    const baseInput =
        "bg-white p-3 pl-4 text-body-1 text-base-brown-400 outline-none border border-base-brown-300 rounded-lg placeholder:text-base-brown-400 transition-colors focus:border-base-brown-400 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-400 focus-within:ring-1 focus-within:ring-base-brown-300";

    const errorInput =
        "text-brand-red border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red/70  focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red/70";

    const { signUpForm, handleInputChange, handleSubmit, errors, isSuccess, isLoading, serverError } = useSignUp()
    const { isVisible, inputType, toggleVisibility, } = usePasswordVisibility()


    return (
        <div className="min-h-[calc(100vh-83px)] flex items-start py-[40px] lg:py-[60px]">
            <div className="flex flex-col items-center gap-6 px-4 py-10 w-[798px] mx-4 bg-base-brown-200 rounded-2xl lg:px-[120px] lg:py-[60px] md:mx-auto">
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Sign up</h2>
                <form
                    onSubmit={handleSubmit()}
                    className="w-full flex flex-col gap-6 lg:gap-7">
                    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={signUpForm.name}
                            onChange={handleInputChange}
                            placeholder="Full name"
                            className={`${baseInput} ${errors.name ? errorInput : ""}`} />
                        {(errors.name) && <div className="pt-1 text-body-3 text-brand-red">{errors.name}</div>}
                    </div>
                    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={signUpForm.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className={`${baseInput} ${errors.username ? errorInput : ""}`} />
                        {(errors.username) && <div className="pt-1 text-body-3 text-brand-red">{errors.username}</div>}
                    </div>
                    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={signUpForm.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={`${baseInput} ${errors.email ? errorInput : ""}`} />
                        {(errors.email) && <div className="pt-1 text-body-3 text-brand-red">{errors.email}</div>}
                    </div>
                    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                        <label htmlFor="password">Password</label>
                        <div className={`flex flex-row ${baseInput}  ${errors.password ? errorInput : ""}`} >
                            <input
                                id="password"
                                name="password"
                                type={inputType}
                                value={signUpForm.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="grow outline-none placeholder:text-base-brown-400" />
                            <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                                {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        </div>
                        {(errors.password) && <div className="pt-1 text-body-3 text-brand-red">{errors.password}</div>}
                    </div>
                    {serverError && (
                        <div className="text-center text-body-3 text-brand-red">
                            {serverError}
                        </div>
                    )}
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        className="self-center lg:mt-3"
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                </form>
                <div className="space-x-3">
                    <span>Already have an account?</span>
                    <Link to={"/login"}>
                        <Button variant="text" size="none">Log in</Button>
                    </Link>
                </div>
            </div >
        </div >
    )
}
export default SignUp