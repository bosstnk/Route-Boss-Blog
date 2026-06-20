import { Link } from "react-router-dom";
import { User, IterationCw } from "lucide-react";

const items = [
  { key: "profile", to: "/member-profile", label: "Profile", Icon: User },
  { key: "reset", to: "/member-reset-password", label: "Reset password", Icon: IterationCw },
];

export function MemberSideMenu({ active = "profile", className = "" }) {
  return (
    <div className={`flex lg:flex-col ${className}`}>
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.to}
          className={`px-4 py-3 flex gap-3 text-body-1 ${
            active === item.key ? "text-base-brown-500" : "text-base-brown-400/70"
          }`}
        >
          <item.Icon size={24} />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default MemberSideMenu;
