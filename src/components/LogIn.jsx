import { Button } from "./common/Button";
import { Link } from "react-router-dom";
import { useLogInForm } from "@/hooks/useLogInForm";
import { Eye, EyeClosed } from 'lucide-react';
import usePasswordVisibility from "@/hooks/usePasswordVisibility";


function LogIn() {
    const {
        loginForm,
        inputForm,
        handleSubmit,
        errors,
        isSuccess,
        isLoading,
        serverError,
    } = useLogInForm();
    const { isVisible, inputType, toggleVisibility, } = usePasswordVisibility()


    const baseInput =
        "bg-white p-3 pl-4 text-body-1 text-base-brown-400 outline-none border border-base-brown-300 rounded-lg placeholder:text-base-brown-400 transition-colors focus:border-base-brown-400 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-500 focus-within:ring-1 focus-within:ring-base-brown-300";

    const errorInput =
        "border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red/70";


    return (
        <div className="mx-4 mt-10 lg:mt-[60px]">
            <div className="flex flex-col items-center gap-6 px-4 py-10 max-w-[798px] bg-base-brown-200 rounded-2xl mx-auto lg:px-[120px] lg:py-[60px] lg:gap-10">
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Log in</h2>
                <form
                    className="w-full flex flex-col"
                    onSubmit={handleSubmit}>
                    <label htmlFor="email" className="mb-1">Email</label>
                    <input
                        id="email"
                        name="email"
                        value={loginForm.email}
                        onChange={inputForm}
                        type="email"
                        placeholder="Email"
                        className={`${baseInput} ${errors.email ? errorInput : ""}`} />
                    {(errors.email) && <div className="pt-1 text-body-3 text-brand-red">{errors.email}</div>}
                    <label htmlFor="password" className="mb-1 mt-6">Password</label>
                    <div className={`flex flex-row ${baseInput}  ${errors.password ? errorInput : ""}`} >
                        <input
                            id="password"
                            name="password"
                            value={loginForm.password}
                            onChange={inputForm}
                            type={inputType}
                            placeholder="Password"
                            className="grow outline-none placeholder:text-base-brown-400"
                        />
                        <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                            {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                        </button>
                    </div>
                    {(errors.password) && <div className="pt-1 text-body-3 text-brand-red">{errors.password}</div>}
                    {serverError && (
                        <div className="mt-4 text-center text-body-3 text-brand-red">
                            {serverError}
                        </div>
                    )}

                    <Button type="submit" variant="primary" text={isLoading ? "Logging in..." : "Log in"} className="mt-6 self-center lg:mt-10" disabled={isLoading}/>
                </form>
                <div className="space-x-3">
                    <span>Don’t have any account?</span>
                    <Link to={"/signup"}>
                        <Button variant="text" text="Sign up" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn;