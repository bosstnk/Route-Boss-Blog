import { Link } from "react-router-dom";
import Button from "@/components/common/Button";

export function GuestActionsDesktop() {
  return (
    <div className="flex gap-2">
      <Link to="/login">
        <Button variant="secondary">Log in</Button>
      </Link>
      <Link to="/signup">
        <Button variant="primary">Sign up</Button>
      </Link>
    </div>
  );
}