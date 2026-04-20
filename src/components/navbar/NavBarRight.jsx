import { Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GuestActionsDesktop } from "@/features/auth/GuestActionsDesktop";
import { UserMenu } from "./UserMenu";
import { UserAccountMenu } from "@/features/auth/UserAccountMenu";
import { MobileMenuPanel } from "@/features/auth/MobileMenuPanel";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";
import { NotificationBox } from "@/features/notification/NotificationBox";
import useNotifications from "@/hooks/useNotifications";

export default function NavBarRight() {
  const { isLoading, profile } = useAuth();
  const { notifications, isLoading: notiLoading } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const [seen, setSeen] = useState(false);
  const hasUnread = notifications.length > 0 && !seen;
  const menuRef = useRef(null);

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

  return (
    <div className="relative flex items-center">

      {/* 🖥️ Desktop */}
      <div className="hidden lg:flex">
        {isLoading ? (
          <SkeletonDemo />
        ) : profile ? (
          <div ref={menuRef} className="relative">
            <UserMenu
              onToggle={() => { setIsOpen(prev => !prev); setIsOpenNoti(false); }}
              onToggleNoti={() => { setIsOpenNoti(prev => !prev); setIsOpen(false); setSeen(true); }}
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
          <SkeletonDemoMobile />
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


export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-12 w-12 rounded-full bg-[#dad6d1]" />
      <Skeleton className="h-6 w-[120px] bg-[#dad6d1]" />
    </div>
  )
}

export function SkeletonDemoMobile() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Skeleton className="h-[4px] w-[24px] bg-[#dad6d1]" />
      <Skeleton className="h-[4px] w-[24px] bg-[#dad6d1]" />
      <Skeleton className="h-[4px] w-[24px] bg-[#dad6d1]" />
    </div>
  )
}