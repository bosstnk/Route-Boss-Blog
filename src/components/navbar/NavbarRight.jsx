import { Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GuestActionsDesktop } from "@/features/auth/GuestActionsDesktop";
import { UserMenu } from "./UserMenu";
import { UserAccountMenu } from "@/features/auth/UserAccountMenu";
import { MobileMenuPanel } from "@/features/auth/MobileMenuPanel";
import { useAuth } from "@/context/AuthContext";


export default function NavbarRight() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center">

      {/* 🖥️ Desktop */}
      <div className="hidden lg:flex">
        {user ? (
          <div ref={menuRef} className="relative">
            <UserMenu onToggle={() => setIsOpen(prev => !prev)} profile={profile} />
            {isOpen && <UserAccountMenu />}
          </div>
        ) : (
          <GuestActionsDesktop />
        )}
      </div>

      {/* 📱 Mobile */}
      <div className="lg:hidden">
        <button onClick={() => setOpen(!open)}>
          <Menu size={24} color="#75716B" />
        </button>

        <MobileMenuPanel
          open={open}
          profile={profile}
          user={user}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}