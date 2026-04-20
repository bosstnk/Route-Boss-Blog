import { NotificationBell } from "@/features/notification/NotificationBell";
import { UserProfileMenu } from "@/features/auth/UserProfileMenu";

export function UserMenu({ onToggle, onToggleNoti, profile, hasUnread }) {
  return (
    <div className="flex flex-row items-center gap-4 min-h-[50px]">

      <NotificationBell onToggleNoti={onToggleNoti} hasUnread={hasUnread} />
      <UserProfileMenu onToggle={onToggle} profile={profile} />
    </div>
  );
}