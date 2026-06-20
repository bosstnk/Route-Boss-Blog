import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { Eye, EyeClosed } from 'lucide-react';



function SignUp() {
    const { signUpForm, handleInputChange, handleSubmit, errors, isLoading, serverError } = useSignUp()
    const { isVisible, inputType, toggleVisibility, } = usePasswordVisibility()


    return (
        <div className="min-h-[calc(100vh-83px)] flex items-start py-[40px] lg:py-[60px]">
            <div className="flex flex-col items-center gap-6 px-4 py-10 w-[798px] mx-4 bg-base-brown-200 rounded-2xl lg:px-[120px] lg:py-[60px] md:mx-auto">
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Sign up</h2>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-6 lg:gap-7">
                    <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        value={signUpForm.name}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        error={errors.name}
                    />
                    <FormInput
                        label="Username"
                        name="username"
                        type="text"
                        value={signUpForm.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        error={errors.username}
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={signUpForm.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        error={errors.email}
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type={inputType}
                        value={signUpForm.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        error={errors.password}
                        rightSlot={
                            <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                                {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        }
                    />
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