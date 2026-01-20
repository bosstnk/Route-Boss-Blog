import { Button } from "./common/Button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function NavBar() {
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

      
      <div className="hidden lg:flex lg:gap-2">
        <Button text="Log in" variant="secondary" />
        <Button text="Sign up" variant="primary" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="lg:hidden ">
          <Menu size={24} color="#75716B" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
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
            <Button text="Log in" variant="secondary" />
            <Button text="Sign up" variant="primary" />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;
