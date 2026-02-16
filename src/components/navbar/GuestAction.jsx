import { Link } from "react-router-dom";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "../common/Button";

export function GuestAction() {
    return (
        <div className="hidden lg:flex lg:gap-2">
            <Link to={"/login"}>
                <Button text="Log in" variant="secondary" />
            </Link>
            <Link to={"/signup"}>
                <Button text="Sign up" variant="primary" />
            </Link>
        </div>
    )
}

export function guestActionMobile() {
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