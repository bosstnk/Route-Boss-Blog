import { Bell } from "lucide-react";

export function NotificationBell() {
  return (
    <button className="bg-white border border-base-brown-200 p-3 rounded-full">
      <Bell size={22} color="#75716B" strokeWidth={1.5} />
    </button>
  );
}