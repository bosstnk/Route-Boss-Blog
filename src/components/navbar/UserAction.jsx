import { Bell, ChevronDown } from "lucide-react";
import imageUser from "@/assets/images/user-picture-demo.jpg"

export function UserAction({ onToggle }) {
    return (
      <div className="flex flex-row gap-4">
        <button className="bg-white border border-base-brown-200 p-3 rounded-full">
          <Bell size={22} color="#75716B" strokeWidth={1.5} />
        </button>
        <div className="flex flex-row gap-2">
          <img src={imageUser} alt="dog" className="w-12 h-12 rounded-full" />
          <span className="text-body-1 text-base-brown-500 self-center">Thanakorn</span>
          <button onClick={onToggle}>
            <ChevronDown size={16} color="#75716B" strokeWidth={1} />
          </button>
        </div>
      </div>
    )
  }