import clsx from "clsx";

export default function Button({
  children,
  variant = "primary", // primary | secondary | text
  disabled = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  // 🎯 ขนาดเดียวตาม design
  const sizeStyle = iconOnly
    ? "p-3 aspect-square"
    : "px-10 py-3 gap-[6px]";

  const variants = {
    primary: clsx(
      "bg-base-brown-600 text-white rounded-full",
      "hover:bg-base-brown-400",
      "active:bg-base-brown-500",
      "disabled:hover:bg-base-brown-600"
    ),

    secondary: clsx(
      "bg-white border border-base-brown-400 text-base-brown-600 rounded-full cursor-pointer",
      "hover:text-base-brown-400",
      "active:text-base-brown-500",
      "disabled:border-base-brown-600",
      "disabled:hover:text-base-brown-600"
    ),
    
    text: clsx(
      "bg-transparent underline text-base-brown-600 !px-0 !py-0 cursor-pointer",
      "hover:text-base-brown-400",
      "active:text-base-brown-500",
      "disabled:hover:text-base-brown-600"
    ),
  };

  return (
    <button
      className={clsx(baseStyle, sizeStyle, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !iconOnly && (
        <span className="flex items-center [&>svg]:w-6 [&>svg]:h-6">
          {leftIcon}
        </span>
      )}

      {/* Text */}
      {!iconOnly && <span>{children}</span>}

      {/* Right Icon */}
      {rightIcon && !iconOnly && (
        <span className="flex items-center [&>svg]:w-6 [&>svg]:h-6">
          {rightIcon}
        </span>
      )}

      {/* Icon Only */}
      {iconOnly && (
        <span className="flex items-center [&>svg]:w-6 [&>svg]:h-6">
          {leftIcon}
        </span>
      )}
    </button>
  );
}