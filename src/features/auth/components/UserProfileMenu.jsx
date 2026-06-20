import { ChevronDown } from "lucide-react";
import avatarProfile from "@/assets/images/user-profile.png"

export function UserProfileMenu({ onToggle, profile }) {
  const { username, image } = profile;

  return (
    <div className="flex flex-row gap-2">
      <img
        src={image || avatarProfile}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover"
      />

      <span className="text-body-1 text-base-brown-500 self-center">
        {username}
      </span>

      <button onClick={onToggle} className="cursor-pointer">
        <ChevronDown size={16} color="#75716B" strokeWidth={1} />
      </button>
    </div>
  );
}