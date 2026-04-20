import clsx from "clsx";

export default function Button({
  children,
  variant = "primary", // primary | secondary | text
  size = "lg", // sm | md | lg
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyle = clsx(
    "inline-flex items-center justify-center font-medium cursor-pointer",
    "transition-all duration-200",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",

    // 👇 คุม icon ทุกตัวใน button
    "[&_svg]:w-6 [&_svg]:h-6 [&_svg]:shrink-0"
  );

  const sizes = {
    none:"",
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-10 py-3 text-base gap-2",
  };

  const variants = {
    primary: clsx(
      "bg-base-brown-600 text-white rounded-full",
      "hover:bg-base-brown-400",
      "active:bg-base-brown-500",
      "focus:ring-base-brown-300"
    ),

    secondary: clsx(
      "bg-white border border-base-brown-400 text-base-brown-600 rounded-full",
      "hover:text-base-brown-400",
      "active:text-base-brown-500",
      "focus:ring-base-brown-300"
    ),

    text: clsx(
      "bg-transparent underline text-base-brown-600",
      "hover:text-base-brown-400",
      "active:text-base-brown-500",
      "px-0 py-0",
      "focus:ring-0"
    ),
  };

  return (
    <button
      className={clsx(baseStyle, sizes[size], variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}