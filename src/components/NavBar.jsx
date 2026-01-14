import LogoPage from "@/assets/images/logo.svg";
import { Button } from "./common/Button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavBar() {
  return (
    <nav
      className="
        flex flex-row justify-between
        w-full
        px-6 py-3
        sticky top-0 z-50
        bg-base-brown-100
        border-b border-b-base-brown-300
        lg:px-[120px] lg:py-4
      "
    >
      <img
        src={LogoPage}
        alt="logo-page"
        className="w-6 h-6 lg:w-auto lg:h-auto"
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Menu size={24} color="#75716B" className="lg:hidden" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={13}
          className="
            flex flex-col gap-6
            w-full min-w-screen
            px-6 py-10
            bg-base-brown-100
            rounded-none
          "
        >
          <DropdownMenuItem className="p-0">
            <Button text="Log in" variant="secondary" className="w-full" />
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Button text="Sign up" variant="primary" className="w-full" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden lg:flex lg:gap-8">
        <Button text="Log in" variant="secondary" />
        <Button text="Sign up" variant="primary" />
      </div>
    </nav>
  );
}

export default NavBar;
