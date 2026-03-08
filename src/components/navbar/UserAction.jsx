import { Bell, ChevronDown } from "lucide-react";

export function UserAction({ onToggle, profile }) {

  const {username, image} = profile
    return (
      <div className="flex flex-row items-center gap-4 min-h-[50px]">
        <button className="bg-white border border-base-brown-200 p-3 rounded-full">
          <Bell size={22} color="#75716B" strokeWidth={1.5} />
        </button>
        <div className="flex flex-row gap-2">
          <img src={image} alt="dog" className="w-12 h-12 rounded-full" />
          <span className="text-body-1 text-base-brown-500 self-center">{username}</span>
          <button onClick={onToggle}>
            <ChevronDown size={16} color="#75716B" strokeWidth={1} />
          </button>
        </div>
      </div>
    )
  }