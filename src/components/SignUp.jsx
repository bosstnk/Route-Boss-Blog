import { useSingUpForm } from "@/hooks/useSignUpForm"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "./common/Button"
import { Link } from "react-router-dom";


function SignUp() {
    const baseInput =
        "bg-white p-3 pl-4 text-body-1 text-base-brown-400 outline-none border border-base-brown-300 rounded-lg placeholder:text-base-brown-400 transition-colors focus:border-base-brown-400 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-500 focus-within:ring-1 focus-within:ring-base-brown-300";

    const errorInput =
        "border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red/70";

    const { singUpForm, inputForm, handleSubmit, errors, isSuccess, isLoading, serverError } = useSingUpForm()

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate("/signup-success");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="mx-4 mt-10 lg:mt-[60px]">
            <div className="flex flex-col items-center gap-6 px-4 py-10 max-w-[798px] bg-base-brown-200 rounded-2xl mx-auto lg:px-[120px] lg:py-[60px]">
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Sign up</h2>
                <form
                    onSubmit={handleSubmit()}
                    className="w-full flex flex-col">
                    <label htmlFor="name" className="mb-1">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={singUpForm.name}
                        onChange={inputForm}
                        placeholder="Full name"
                        className={`${baseInput} ${errors.name ? errorInput : ""}`} />
                    {(errors.name) && <div className="pt-1 text-body-3 text-brand-red">{errors.name}</div>}
                    <label htmlFor="username" className="mb-1 mt-6">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={singUpForm.username}
                        onChange={inputForm}
                        placeholder="Username"
                        className={`${baseInput} ${errors.username ? errorInput : ""}`} />
                    {(errors.username) && <div className="pt-1 text-body-3 text-brand-red">{errors.username}</div>}
                    <label htmlFor="email" className="mb-1 mt-6">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={singUpForm.email}
                        onChange={inputForm}
                        placeholder="Email"
                        className={`${baseInput} ${errors.email ? errorInput : ""}`} />
                    {(errors.email) && <div className="pt-1 text-body-3 text-brand-red">{errors.email}</div>}
                    <label htmlFor="password" className="mb-1 mt-6">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={singUpForm.password}
                        onChange={inputForm}
                        placeholder="Password"
                        className={`${baseInput} ${errors.password ? errorInput : ""}`} />
                    {(errors.password) && <div className="pt-1 text-body-3 text-brand-red">{errors.password}</div>}
                    {serverError && (
                        <div className="mt-4 text-center text-body-3 text-brand-red">
                            {serverError}
                        </div>
                    )}
                    <Button
                        type="submit"
                        variant="primary"
                        text={isLoading ? "Signing up..." : "Sign Up"}
                        disabled={isLoading}
                        className="mt-6 self-center"
                    />
                </form>
                <div className="space-x-3">
                    <span>Already have an account?</span>
                    <Link to={"/login"}>
                        <Button variant="text" text="Log in" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SignUp