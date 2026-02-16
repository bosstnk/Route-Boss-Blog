import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToggle } from "@/hooks/useToggle";
import { GuestAction } from "./GuestAction";
import { GuestActionMobile } from "./MobileAction";
import { UserAction } from "./UserAction";
import { useAuth } from "@/context/AuthContext";
import { UserAccountMenu } from "./DropdownAction";
import { useEffect } from "react";

function NavBar() {
  const { isShow, switchToggle, reset } = useToggle();
  const { user, loading } = useAuth();


  useEffect(() => {
    if (!user) reset();
  }, [user]);

  return (
    <nav
      className="
        flex items-center justify-between
        w-full
        py-3 px-6 lg:py-4 lg:px-[120px]
        sticky top-0 z-50
        bg-base-brown-100
        border-b border-b-base-brown-300
      "
    >
      <Link to={"/"} className="text-2xl font-bold lg:text-4xl">
        Boss<span className="text-green-400">.</span>
      </Link>

      <div className="relative">
        {user ? <UserAction onToggle={switchToggle} /> : <GuestAction />}
        {user && isShow && <UserAccountMenu />}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="lg:hidden ">
          <Menu size={24} color="#75716B" />
        </DropdownMenuTrigger>
        <GuestActionMobile />
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;