import { Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GuestActionsDesktop } from "@/features/auth/GuestActionsDesktop";
import { UserMenu } from "./UserMenu";
import { UserAccountMenu } from "@/features/auth/UserAccountMenu";
import { MobileMenuPanel } from "@/features/auth/MobileMenuPanel";
import { useAuth } from "@/context/AuthContext";
import { NavBarSkeleton } from "@/components/navbar/NavBarSkeleton";
import { NavBarSkeletonMobile } from "@/components/navbar/NavBarSkeletonMobile";
import { NotificationBox, useNotifications } from "@/features/notification";

export default function NavBarRight() {
  const { isLoading, profile } = useAuth();
  const { notifications, isLoading: notiLoading, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const hasUnread = unreadCount > 0;
  const menuRef = useRef(null);
  const notiWasOpenRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsOpenNoti(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpenNoti) {
      notiWasOpenRef.current = true;
    } else if (notiWasOpenRef.current) {
      markAllAsRead();
      notiWasOpenRef.current = false;
    }
  }, [isOpenNoti, markAllAsRead]);

  return (
    <div className="relative flex items-center">

      {/* 🖥️ Desktop */}
      <div className="hidden lg:flex">
        {isLoading ? (
          <NavBarSkeleton />
        ) : profile ? (
          <div ref={menuRef} className="relative">
            <UserMenu
              onToggle={() => { setIsOpen(prev => !prev); setIsOpenNoti(false); }}
              onToggleNoti={() => {
                setIsOpenNoti((prev) => !prev);
                setIsOpen(false);
              }}
              profile={profile}
              hasUnread={hasUnread}
            />
            {isOpen && <UserAccountMenu />}
            {isOpenNoti && <NotificationBox notifications={notifications} isLoading={notiLoading} />}
          </div>
        ) : (
          <GuestActionsDesktop />
        )}
      </div>

      {/* 📱 Mobile */}
      <div className="lg:hidden flex items-center">
        {isLoading ? (
          <NavBarSkeletonMobile />
        ) : (
          <button onClick={() => setOpen(!open)}>
            <Menu size={24} color="#75716B" />
          </button>
        )}
        <MobileMenuPanel
          open={open}
          profile={profile}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}