import { Button } from "./common/Button";
import { Menu, Bell, User, IterationCw, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import imageUser from "@/assets/images/user-picture-demo.jpg"
import { useToggleMenu } from "@/hooks/useToggleMenu";

function NavBar() {
  const {isShow,switchToggle} = useToggleMenu()
  return (
    <nav
      className="
        flex items-center justify-between
        w-full
        px-6 py-3 lg:px-[120px] lg:py-4
        sticky top-0 z-50
        bg-base-brown-100
        border-b border-b-base-brown-300
      "
    >
      <Link to={"/"} className="text-2xl font-bold">
        Boss<span className="text-green-400">.</span>
      </Link>


      {/* <div className="hidden lg:flex lg:gap-2">
        <Link to={"/login"}>
          <Button text="Log in" variant="secondary" />
        </Link>
        <Link to={"/signup"}>
          <Button text="Sign up" variant="primary" />
        </Link>
      </div> */}
      <div className="relative">
        <UserLoginProfileWindow onToggle={switchToggle} />
        {isShow && <MenuBarWindow />}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="lg:hidden ">
          <Menu size={24} color="#75716B" />
        </DropdownMenuTrigger>

        {/*         <DropdownMenuContent
          align="start"
          side="bottom"
          className="
            flex flex-col gap-6
            w-screen
            px-6 py-10 mt-3
            bg-base-brown-100
            rounded-none
          "
        >
          <Link to={"/login"}>
            <Button text="Log in" variant="secondary" className="w-full" />
          </Link>
          <Link to={"/signup"}>
            <Button text="Sign up" variant="primary" className="w-full" />
          </Link>
        </DropdownMenuContent> */}
        <UserLoginProfileMobile />
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;

function UserLoginProfileMobile() {
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
      </div>
      <hr />
      <button className="text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
        <LogOut size={24} color="#75716B" strokeWidth={1} />
        <span className="items-center">Log out</span>
      </button>
    </DropdownMenuContent>
  )
}

function UserLoginProfileWindow({onToggle}) {
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

function MenuBarWindow() {
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
      <hr />
      <button className="text-body-1 text-base-brown-500 px-4 py-3 flex gap-3">
        <LogOut size={24} color="#75716B" strokeWidth={1} />
        <span className="items-center">Log out</span>
      </button>
    </div>
  )
}