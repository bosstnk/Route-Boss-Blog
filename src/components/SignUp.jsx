import { useSingUpForm } from "@/hooks/useSignUpForm"
import { Button } from "./common/Button"
import { Check } from 'lucide-react';
import { Link } from "react-router-dom";


function SignUp() {
    const baseInput =
        "bg-white py-3 pl-4 pr-3 text-body-1 outline-none rounded-lg placeholder:text-base-brown-400 transition-colors ";

    const normalInput =
        "border border-base-brown-300 text-base-brown-400 focus:border-base-brown-500 focus:ring-1 focus:ring-base-brown-300";

    const errorInput =
        "border-1 border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red";

    const { singUpForm, inputForm, handleSubmit, errors, isSucess } = useSingUpForm()

    return (
        <div className="px-4 pt-10">
            {(!isSucess)
                ? <div className="flex flex-col items-center gap-6 max-w-[798px] bg-base-brown-200 rounded-2xl px-4 py-10 mx-auto">
                    <h2 className="text-headline-2 text-base-brown-600">Sign up</h2>
                    <form
                        onSubmit={handleSubmit()}
                        className="w-full flex flex-col">
                        <label htmlFor="name" className="pb-1">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={singUpForm.name}
                            onChange={inputForm}
                            placeholder="Full name"
                            className={`${baseInput} ${errors.name ? errorInput : normalInput}`} />
                        {(errors.name) && <div className="pt-1 text-body-3 text-brand-red">{errors.name}</div>}
                        <label htmlFor="username" className="pb-1 pt-6">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={singUpForm.username}
                            onChange={inputForm}
                            placeholder="Username"
                            className={`${baseInput} ${errors.username ? errorInput : normalInput}`} />
                        {(errors.username) && <div className="pt-1 text-body-3 text-brand-red">{errors.username}</div>}
                        <label htmlFor="email" className="pb-1 pt-6">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={singUpForm.email}
                            onChange={inputForm}
                            placeholder="Email"
                            className={`${baseInput} ${errors.email ? errorInput : normalInput}`} />
                        {(errors.email) && <div className="pt-1 text-body-3 text-brand-red">{errors.email}</div>}
                        <label htmlFor="password" className="pb-1 pt-6">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={singUpForm.password}
                            onChange={inputForm}
                            placeholder="Password"
                            className={`${baseInput} ${errors.password ? errorInput : normalInput}`} />
                        {(errors.password) && <div className="pt-1 text-body-3 text-brand-red">{errors.password}</div>}
                        <Button type="submit" variant="primary" text="Sign Up" className="mt-6 self-center" />
                    </form>
                    <div className="space-x-3">
                        <span>Already have an account?</span>
                        <Link to={"/login"}>
                            <Button variant="text" text="Log in" />
                        </Link>
                    </div>
                </div>
                : <SucessSignUp />
            }
        </div>
    )
}
function SucessSignUp() {
    return (
        <div className="w-full flex flex-col items-center gap-10 max-w-[798px] px-6 py-10 mx-auto bg-base-brown-200 rounded-2xl">
            <div className="p-4 bg-brand-green rounded-full text-white">
                <Check size={48} strokeWidth={8} absoluteStrokeWidth />
            </div>
            <h3 className="text-headline-3">Registration success</h3>
            <Button variant="primary" text="Conitnue" />
        </div>
    )
}
export default SignUp