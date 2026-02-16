import NavBar from "@/components/navbar/NavBar"
import { User, IterationCw } from "lucide-react";
import imageUser from "@/assets/images/user-picture-demo.jpg"
import { Button } from "@/components/common/Button";
import { Link } from "react-router-dom";


function MemberProfilePage() {
    const inputStyle = "w-full bg-white p-3 pl-4 text-body-1 outline-none rounded-lg transition-colors"

    return (
        <>
            <NavBar />
            <div className="w-full h-screen bg-base-brown-100">
                <div className="max-w-[794px] mx-auto lg:pt-13">
                    <div className="lg:hidden">
                        <MenuMember className="hover:underline"/>
                    </div>
                    <div className="py-6 px-4 flex items-center gap-3 lg:gap-4 lg:p-0">
                        <img src={imageUser} alt="dog" className="w-[40px]] h-[40px] rounded-full lg:w-[60px] lg:h-[60px]" />
                        <h4 className="text-headline-4 text-base-brown-400 lg:text-headline-3">Thanakorn</h4>
                        <span className="text-base-brown-300 font-thin mx-1 text-3xl lg:font-extralight lg:mx-0">|</span>
                        <h4 className="text-headline-4 text-base-brown-600 lg:text-headline-3">Profile</h4>
                    </div>
                    <div className="lg:flex lg:gap-12 lg:mt-8">
                        <div className="hidden lg:block">
                            <MenuMember />
                        </div>
                        <div className="bg-base-brown-200 px-4 pt-6 pb-10 space-y-6 lg:space-y-10 lg:p-10 lg:rounded-2xl lg:grow">
                            <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-7">
                                <img src={imageUser} alt="dog" className="w-30 h-30 rounded-full" />
                                <Button variant="secondary" text="Upload profile picture" />
                            </div>
                            <hr className="border-b border-b-base-brown-300 border-t-0" />
                            <form className="flex flex-col items-start">
                                <label htmlFor="name" className="pb-1 text-body-1 text-base-brown-400">Name</label>
                                <input type="text" id="name" className={inputStyle} />
                                <label htmlFor="username" className="pb-1 mt-6 text-body-1 text-base-brown-400 lg:mt-7">Username</label>
                                <input type="text" id="name" className={inputStyle} />
                                <div className="text-body-1 text-base-brown-400/60 mt-6 lg:mt-7">
                                    <p className="pb-1">Email</p>
                                    <p className="p-3 pl-4">thankorn@gmail.com</p>
                                </div>
                                <Button variant="primary" text="Save" className="mt-6 lg:mt-10"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberProfilePage

function MenuMember({className=""}) {
    return (
        <div className="flex lg:flex-col">
            <button
                className={`text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointer`}
            >
                <User size={24} color="#75716B" strokeWidth={2} absoluteStrokeWidth />
                <span className="items-center">Profile</span>
            </button>
            <Link
                to={"/member-reset-password"}
                className={`text-body-1 text-base-brown-400/70 px-4 py-3 flex gap-3 cursor-pointer ${className}`}
            >
                <IterationCw size={24} color="#DAD6D1" strokeWidth={2} absoluteStrokeWidth />
                <span className="items-center">Reset password</span>
            </Link>
        </div>
    )
}