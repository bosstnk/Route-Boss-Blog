import { Link } from "react-router-dom";
import { useLogIn } from "@/features/auth/hooks/useLogIn";
import { Eye, EyeClosed } from 'lucide-react';
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";


function LogIn() {
    const {
        loginForm,
        handleChange,
        handleSubmit,
        errors,
        isLoading,
    } = useLogIn();
    const { isVisible, inputType, toggleVisibility, } = usePasswordVisibility()


    return (
        <div className="mx-4 mt-10 lg:mt-[60px]">
            <div className="flex flex-col items-center gap-6 px-4 py-10 max-w-[798px] bg-base-brown-200 rounded-2xl mx-auto lg:px-[120px] lg:py-[60px] lg:gap-10">
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Log in</h2>
                <form
                    className="w-full flex flex-col gap-6 lg:gap-7"
                    onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={loginForm.email}
                        onChange={handleChange}
                        placeholder="Email"
                        error={errors.email}
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type={inputType}
                        value={loginForm.password}
                        onChange={handleChange}
                        placeholder="Password"
                        error={errors.password}
                        rightSlot={
                            <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                                {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        }
                    />
                    <Button type="submit" variant="primary" disabled={isLoading} className="self-center lg:mt-3">{isLoading ? "Logging in..." : "Log in"}</Button>
                </form>
                <div className="space-x-3">
                    <span>Don't have any account?</span>
                    <Link to={"/signup"}>
                        <Button variant="text" size="none">Sign up</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn;