import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, IterationCw, LogOut, SquareArrowOutUpRight } from "lucide-react";

export function UserAccountMenu() {
    const { logout } = useAuth()
    const navigat = useNavigate()

    return (
        <div className="absolute top-15 right-0 min-w-[249px] rounded-xl py-2 bg-base-brown-100 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)]">
            <button className="w-full text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointer"
                onClick={() => navigat("/member-profile")}>
                <User size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Profile</span>
            </button>
            <button className="w-full text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointer"
                onClick={() => navigat("/member-reset-password")}>
                <IterationCw size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Reset password</span>
            </button>
            <button className="w-full text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointer"
                onClick={() => navigat("/admin/article-management")}>
                <SquareArrowOutUpRight size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Admin panel</span>
            </button>
            <hr />
            <button className="text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointer"
                onClick={logout}>
                <LogOut size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Log out</span>
            </button>
        </div>
    )
}