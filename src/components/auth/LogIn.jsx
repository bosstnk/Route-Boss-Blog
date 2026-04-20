import { Link } from "react-router-dom";
import { useLogIn } from "@/hooks/auth/useLogIn";
import { Eye, EyeClosed } from 'lucide-react';
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import Button from "../common/Button";


function LogIn() {
    const {
        loginForm,
        handleChange,
        handleSubmit,
        errors,
        isLoading,
    } = useLogIn();
    const { isVisible, inputType, toggleVisibility, } = usePasswordVisibility()


    const baseInput =
        "bg-white p-3 pl-4 text-body-1 text-base-brown-400 outline-none border border-base-brown-300 rounded-lg placeholder:text-base-brown-400 transition-colors focus:border-base-brown-400 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-400 focus-within:ring-1 focus-within:ring-base-brown-300";

    const errorInput =
        "border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red/70";


    return (
        <div className="mx-4 mt-10 lg:mt-[60px]">
            <div className="flex flex-col items-center gap-6 px-4 py-10 max-w-[798px] bg-base-brown-200 rounded-2xl mx-auto lg:px-[120px] lg:py-[60px] lg:gap-10">
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Log in</h2>
                <form
                    className="w-full flex flex-col gap-6 lg:gap-7"
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={loginForm.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            className={`${baseInput} ${errors.email ? errorInput : ""}`} />
                        {(errors.email) && <div className="text-body-3 text-brand-red">{errors.email}</div>}
                    </div>
                    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                        <label htmlFor="password">Password</label>
                        <div className={`flex flex-row ${baseInput}  ${errors.password ? errorInput : ""}`} >
                            <input
                                id="password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleChange}
                                type={inputType}
                                placeholder="Password"
                                className="grow outline-none placeholder:text-base-brown-400"
                            />
                            <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                                {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        </div>
                        {(errors.password) && <div className="text-body-3 text-brand-red">{errors.password}</div>}
                    </div>
                    <Button type="submit" variant="primary" disabled={isLoading} className="self-center lg:mt-3">{isLoading ? "Logging in..." : "Log in"}</Button>
                </form>
                <div className="space-x-3">
                    <span>Don’t have any account?</span>
                    <Link to={"/signup"}>
                        <Button variant="text" size="none">Sign up</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn;