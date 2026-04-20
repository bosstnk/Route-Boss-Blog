import { User, IterationCw, Bell, LogOut, Globe, FolderOpen, Notebook } from "lucide-react";
import { Link } from "react-router-dom";
import useActivePath from "@/hooks/useActivePath";

function AdminSidebar() {
    const {isActive} = useActivePath()
    const menuBoxBaseStyle = "flex flex-row gap-3 py-5 px-6 text-base-brown-400 hover:bg-base-brown-300/80"

    return (
        <aside className="sticky top-0 py-4 w-[280px] h-screen flex flex-col justify-between bg-base-brown-200">
            <div>
                <div className="py-[60px] px-6 space-y-1">
                    <h2 className="text-headline-2">Boss<span className="text-green-400">.</span></h2>
                    <h4 className="text-headline-4 text-brand-orange">Admin panel</h4>
                </div>
                <Link
                    to="/admin/article-management"
                    className={`${menuBoxBaseStyle} ${isActive("/admin/article-management") ? "bg-base-brown-300" : ""}`}
                >
                    <Notebook size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Article management</span>
                </Link>
                <Link
                    to="/admin/category-management"
                    className={`${menuBoxBaseStyle} ${isActive("/admin/category-management") ? "bg-base-brown-300" : ""}`}
                >
                    <FolderOpen size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Category management</span>
                </Link>
                <Link
                    to="/admin/profile"
                    className={`${menuBoxBaseStyle} ${isActive("/admin/profile") ? "bg-base-brown-300" : ""}`}
                >
                    <User size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Profile</span>
                </Link>
                <Link
                    to="/admin/notification"
                    className={`${menuBoxBaseStyle} ${isActive("/admin/notification") ? "bg-base-brown-300" : ""}`}
                >
                    <Bell size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Notification</span>
                </Link>
                <Link
                    to="/admin/reset-password"
                    className={`${menuBoxBaseStyle} ${isActive("/admin/reset-password") ? "bg-base-brown-300" : ""}`}
                >
                    <IterationCw size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Reset password</span>
                </Link>
            </div>
            <div>
                <Link to="/" className={menuBoxBaseStyle}>
                    <Globe size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Boss. website</span>
                </Link>
                <Link
                    to="/admin/login"
                    className={menuBoxBaseStyle}
                >
                    <LogOut size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    <span className="items-center">Log out</span>
                </Link>
            </div>
        </aside>
    )
}

export default AdminSidebar