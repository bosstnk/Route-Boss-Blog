import NavBar from "@/components/navbar/NavBar"
import { User, IterationCw } from "lucide-react";
import imageUser from "@/assets/images/user-picture-demo.jpg"
import { Button } from "@/components/common/Button";
import { Link } from "react-router-dom";


function MemberResetPasswordPage() {
    const inputStyle = "w-full bg-white p-3 pl-4 text-body-1 outline-none rounded-lg transition-colors placeholder:text-base-brown-400"

    return (
        <>
            <NavBar />
            <div className="w-full min-h-screen bg-base-brown-100">
                <div className="max-w-[794px] mx-auto lg:pt-13">
                    <div className="lg:hidden">
                        <MenuMember className="hover:underline"/>
                    </div>
                    <div className="py-6 px-4 flex items-center gap-3 lg:gap-4 lg:p-0">
                        <img src={imageUser} alt="dog" className="w-[40px]] h-[40px] rounded-full lg:w-[60px] lg:h-[60px]" />
                        <h4 className="text-headline-4 text-base-brown-400 truncate lg:text-headline-3">Thanakorn</h4>
                        <span className="text-base-brown-300 font-thin mx-1 text-3xl lg:font-extralight lg:mx-0">|</span>
                        <h4 className="text-headline-4 text-base-brown-600 lg:text-headline-3">Reset password</h4>
                    </div>
                    <div className="lg:flex lg:gap-12 lg:mt-8">
                        <div className="hidden lg:block">
                            <MenuMember />
                        </div>
                        <div className="bg-base-brown-200 px-4 pt-6 pb-10 space-y-6 lg:space-y-10 lg:p-10 lg:rounded-2xl lg:grow">
                            <form className="flex flex-col items-start">
                                <label htmlFor="password" className="pb-1 text-body-1 text-base-brown-400">Current password</label>
                                <input type="password" id="password" placeholder="Current password" className={inputStyle} />
                                <label htmlFor="newpassword" className="pb-1 mt-6 text-body-1 text-base-brown-400 lg:mt-7">New password</label>
                                <input type="password" id="newpassword" placeholder="New password" className={inputStyle} />
                                <label htmlFor="confirmpassword" className="pb-1 mt-6 text-body-1 text-base-brown-400 lg:mt-7">Confirm new password</label>
                                <input type="password" id="confirmpassword" placeholder="Confirm new password" className={inputStyle} />
                                <Button variant="primary" text="Reset password" className="mt-6 self-start lg:mt-10" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberResetPasswordPage


function MenuMember({className=""}) {
    return (
        <div className="flex lg:flex-col">
            <Link
                to={"/member-profile"}
                className={`text-body-1 text-base-brown-400/70 px-4 py-3 flex gap-3 cursor-pointer ${className}`}
            >
                <User size={24} color="#DAD6D1" strokeWidth={2} absoluteStrokeWidth />
                <span className="items-center">Profile</span>
            </Link>
            <button
                className={`text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointe`}
            >
                <IterationCw size={24} color="#75716B" strokeWidth={2} absoluteStrokeWidth />
                <span className="items-center">Reset password</span>
            </button>
        </div>
    )
}