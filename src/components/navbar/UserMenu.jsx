import { NotificationBell } from "@/features/notification/NotificationBell";
import { UserProfileMenu } from "@/features/auth/UserProfileMenu";

export function UserMenu({ onToggle, profile }) {
  return (
    <div className="flex flex-row items-center gap-4 min-h-[50px]">
      <NotificationBell />
      <UserProfileMenu onToggle={onToggle} profile={profile} />
    </div>
  );
}