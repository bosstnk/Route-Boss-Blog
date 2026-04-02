import { Bell } from "lucide-react";

export function NotificationBell() {
  return (
    <button className="relative bg-white border border-base-brown-200 p-3 rounded-full">
      <Bell size={22} color="#75716B" strokeWidth={1.5} />
      <div className="absolute w-[8px] h-[8px] bg-brand-red rounded-full top-[3px] right-[3px]"></div>
    </button>

  );
}