import Button from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { User, IterationCw, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Bell } from "lucide-react";
import { NotificationBell } from "../notification/NotificationBell";
export function MobileMenuPanel({ open, onClose }) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;
  console.log(profile)
  return (
    <div className="
    fixed top-[57px] left-0
    w-full
    bg-base-brown-100
    border-b border-base-brown-300
    z-50
    ">
      <div className="flex flex-col gap-4 p-6">

        {profile ? (
          <>
            {/* USER HEADER */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <img src={profile.image} className="w-12 h-12 rounded-full" />
                <p className="self-center">{profile.username}</p>
              </div>
              <NotificationBell />
            </div>

            {/* USER MENU */}
            <button onClick={() => navigate("/member-profile")} className="flex gap-3 px-4 py-3">
              <User size={24} /> Profile
            </button>

            <button onClick={() => navigate("/member-reset-password")} className="flex gap-3 px-4 py-3">
              <IterationCw size={24} /> Reset password
            </button>

            {profile?.role === "admin" && (
              <button
                onClick={() => navigate("/admin/article-management")}
                className="flex gap-3 px-4 py-3"
              >
                <SquareArrowOutUpRight size={24} />
                Admin panel
              </button>
            )}


            <hr />

            <button onClick={logout} className="flex gap-3 px-4 py-3">
              <LogOut size={24} /> Log out
            </button>
          </>
        ) : (
          <>
            {/* GUEST */}
            <Link to="/login">
              <Button variant="secondary" className="w-full">
                Log in
              </Button>
            </Link>

            <Link to="/signup">
              <Button variant="primary" className="w-full">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}