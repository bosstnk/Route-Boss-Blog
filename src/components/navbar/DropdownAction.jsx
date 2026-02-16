import { notifications } from "@/data/notification";
import { User, IterationCw, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function NotificationBox() {
    return (
        <div className="max-w-[343px] p-4 bg-base-brown-100 shadow-[2px_2px_16px_0_rgba(0,0,0,0.1)] space-y-4 rounded-xl">
            {notifications.map((notification) => (
                <div className="flex flex-row gap-3">
                    <Avatar className="w-12 h-12">
                        <AvatarImage
                            src={notification.user.avatar}
                            alt={notification.user.name}
                        />
                        <AvatarFallback>
                            {notification.user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-body-1 text-base-brown-500">
                            <span className="font-bold">{notification.user.name}</span> {notification.type}
                        </p>
                        <div className="text-body-3 text-brand-orange">{notification.time}</div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}


export function UserAccountMenu() {
    return (
        <div className="absolute right-0 min-w-[249px] rounded-xl py-2 mt-3 bg-base-brown-100 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)]">
            <button className="w-full text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
                <User size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Profile</span>
            </button>
            <button className="w-full text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
                <IterationCw size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Reset password</span>
            </button>
            <button className="w-full text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
                <SquareArrowOutUpRight size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Admin panel</span>
            </button>
            <hr />
            <button className="text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
                <LogOut size={24} color="#75716B" strokeWidth={1} />
                <span className="items-center">Log out</span>
            </button>
        </div>
    )
}