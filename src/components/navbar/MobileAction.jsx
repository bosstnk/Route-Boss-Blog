import { Link } from "react-router-dom";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "../common/Button";
import { Bell, User, IterationCw, LogOut, SquareArrowOutUpRight } from "lucide-react";

export function GuestActionMobile() {
    return (
        <DropdownMenuContent
            align="start"
            side="bottom"
            className="
            flex flex-col gap-6
            w-screen
            py-10 px-6 mt-3 
            bg-base-brown-100
            rounded-none"
        >
            <Link to={"/login"}>
                <Button text="Log in" variant="secondary" className="w-full" />
            </Link>
            <Link to={"/signup"}>
                <Button text="Sign up" variant="primary" className="w-full" />
            </Link>
        </DropdownMenuContent>
    )
}

export function DropdownMenuAccount() {
    return (
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="
      flex flex-col gap-4
      w-screen
      p-6 mt-3
      bg-base-brown-100
      rounded-none
      border-b-0
      border-t
      border-t-base-brown-300
    "
      >
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row gap-2">
            <img src={imageUser} alt="dog" className="w-12 h-12 rounded-full" />
            <p className="text-body-1 text-base-brown-500 self-center">Thanakorn</p>
          </div>
          <button className="bg-white border border-base-brown-200 p-3 rounded-full">
            <Bell size={22} color="#75716B" strokeWidth={1.5} />
          </button>
        </div>
        <div>
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
        </div>
        <hr />
        <button className="text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
          <LogOut size={24} color="#75716B" strokeWidth={1} />
          <span className="items-center">Log out</span>
        </button>
      </DropdownMenuContent>
    )
  }