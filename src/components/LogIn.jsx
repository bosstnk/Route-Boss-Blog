import { Button } from "./common/Button";
import { Link } from "react-router-dom";
import { useLogInForm } from "@/hooks/useLogInForm";
import { Eye, EyeOff, EyeClosed } from 'lucide-react';

function LogIn() {
    const { inputForm, handleSubmit, isSucess, hasError } = useLogInForm();
    if (!hasError && isSucess) {
        console.log("success")
    }
    const baseInput =
        "bg-white py-3 pl-4 pr-3 text-body-1 outline-none rounded-lg placeholder:text-base-brown-400 transition-colors ";

    const normalInput =
        "border border-base-brown-300 text-base-brown-400 focus:border-base-brown-500 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-500 focus-within:ring-1 focus-within:ring-base-brown-300";

    const errorInput =
        "border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red";
    return (
        <div className="px-4 pt-10">
            <div className="flex flex-col items-center gap-6 max-w-[798px] bg-base-brown-200 rounded-2xl px-4 py-10 mx-auto md:px-[120px] md:py-[60px] md:gap-10">
                <h2 className="text-headline-2 text-base-brown-600">Log In</h2>
                <form
                    className="w-full flex flex-col"
                    onSubmit={handleSubmit}>
                    <label htmlFor="email" className="pb-1">Email</label>
                    <input
                        id="email"
                        name="email"
                        onChange={inputForm}
                        type="email"
                        placeholder="Email"
                        className={`${baseInput} ${hasError ? errorInput : normalInput}`} />
                    <label htmlFor="password" className="pb-1 pt-6">Password</label>
                    <div className={`flex flex-row ${baseInput}  ${hasError ? errorInput : normalInput}`} >
                        <input
                            id="password"
                            name="password"
                            onChange={inputForm}
                            type="password"
                            placeholder="Password"
                            className="grow outline-none placeholder:text-base-brown-400"
                        />
                        <button className="cursor-pointer">
                            <EyeClosed />
                        </button>
                    </div>

                    <Button type="submit" variant="primary" text="Log in" className="mt-6 self-center md:mt-10" />
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