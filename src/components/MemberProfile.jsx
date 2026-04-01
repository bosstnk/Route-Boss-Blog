import { User, IterationCw } from "lucide-react";
import imageUser from "@/assets/images/user-picture-demo.jpg"
import { useSelectMenu } from "@/hooks/useSelectMenu";

function MemberManagement() {
    const {activeMenu,selectProfile,selectResetPass} = useSelectMenu()
    const inputStyle = "bg-white py-3 pr-3 pl-4 text-body-1 outline-none rounded-lg transition-colors"
    return (
        <div className="w-full min-h-screen bg-base-brown-100">
            <div className="max-w-[794px] mx-auto lg:pt-13 lg:pb-36">
                <div className="lg:hidden">
                    <MenuMember clickProfile={selectProfile} clickResetPass={selectResetPass} menu={activeMenu}/>
                </div>
                <div className="py-6 px-4 flex items-center gap-3 lg:gap-4 lg:p-0">
                    <img src={imageUser} alt="dog" className="w-12 h-12 rounded-full lg:w-[60px] lg:h-[60px]" />
                    <h4 className="text-headline-4 text-base-brown-400 lg:text-headline-3">Thanakorn</h4>
                    <span className="text-base-brown-300 font-thin mx-1 text-3xl lg:font-extralight lg:mx-0">|</span>
                    <h4 className="text-headline-4 text-base-brown-600 lg:text-headline-3">{activeMenu === "profile" ? "Profile" : activeMenu === "resetpass" ? "Reset password" :""}</h4>
                </div>
                <div className="lg:flex lg:gap-12 lg:mt-8">
                    <div className="hidden lg:block">
                        <MenuMember clickProfile={selectProfile} clickResetPass={selectResetPass} menu={activeMenu}/>
                    </div>
                    <div className="bg-base-brown-200 px-4 pt-6 pb-10 lg:p-10 lg:rounded-2xl lg:grow">
                        {
                            activeMenu === "profile"
                                ? <ProfileManagement classInput={inputStyle} />
                                : activeMenu === "resetpass"
                                    ? <ResetPasswordManagement classInput={inputStyle} />
                                    : <div className="text-headline-1 text-red-600">Error</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberManagement;

function ProfileManagement({ classInput }) {
    return (
        <div className="space-y-6 lg:space-y-10">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-7">
                <img src={imageUser} alt="dog" className="w-30 h-30 rounded-full" />
                <Button variant="secondary" text="Upload profile picture" />
            </div>
            <hr className="border-b border-b-base-brown-300 border-t-0" />
            <div className="flex flex-col">
                <label htmlFor="name" className="pb-1">Name</label>
                <input type="text" id="name" className={classInput} />
                <label htmlFor="username" className="pb-1 mt-6">Username</label>
                <input type="text" id="name" className={classInput} />
                <div className="text-body-1 text-base-brown-400 mt-6">
                    <p className="pb-1">Email</p>
                    <p className="py-3 pr-3 pl-4">thankorn@gmail.com</p>
                </div>
            </div>
            <Button variant="primary" text="Save" />
        </div>

    )
}

function ResetPasswordManagement({ classInput }) {
    return (
        <div className="flex flex-col">
            <label htmlFor="password" className="pb-1">Current password</label>
            <input type="password" id="password" className={classInput} />
            <label htmlFor="newpassword" className="pb-1 mt-6 lg:mt-7">New password</label>
            <input type="password" id="newpassword" className={classInput} />
            <label htmlFor="confirmpassword" className="pb-1 mt-6 lg:mt-7">Confirm new password</label>
            <input type="password" id="confirmpassword" className={classInput} />
            <Button variant="primary" text="Reset password" className="mt-6 self-start lg:mt-10" />
        </div>
    )

}


function MenuMember({ clickProfile, clickResetPass, menu }) {
    const activeButtonStyle = "border-b border-b-base-brown-400 text-base-brown-500 bg-base-brown-200 rounded-full"

    return (
        <div className="flex lg:flex-col">
            <button
                className={`text-body-1 px-4 py-3 flex gap-3 cursor-pointer ${menu ==="profile" ? activeButtonStyle : "text-base-brown-400"}`}
                onClick={clickProfile}
            >
                <User size={24} strokeWidth={1.5} absoluteStrokeWidth/>
                <span className="items-center">Profile</span>
            </button>
            <button
                className={`text-body-1 px-4 py-3 flex gap-3 cursor-pointer ${menu ==="resetpass" ? activeButtonStyle : "text-base-brown-400"}`}
                onClick={clickResetPass}
            >
                <IterationCw size={24} strokeWidth={1.5} absoluteStrokeWidth/>
                <span className="items-center">Reset password</span>
            </button>
        </div>
    )
}