import { ComponentPropsWithRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  theme?:
    | "default"
    | "default2"
    | "primary"
    | "secondary"
    | "dark"
    | "danger"
    | "danger2";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  type,
  className,
  theme = "default",
  size = "small",
  onClick,
  disabled = false,
  ref,
}: ButtonProps) => {
  const themes = {
    default: "bg-slate-300 text-slate-800 font-normal",
    default2: "bg-slate-300 text-slate-800 font-normal",
    primary: "bg-indigo-600 text-white font-semibold hover:bg-indigo-800",
    secondary: "bg-primary text-white font-semibold hover:bg-cream",
    dark: "bg-dark-accent text-white font-semibold hover:bg-accent",
    danger: "bg-red-500 text-white font-medium",
    danger2: "bg-red-600/30 text-red-600",
  };
  const sizes = {
    small: "h-8 px-5 text-sm",
    medium: "h-10 px-6",
    large: "h-12 px-5",
  };
  return (
    <button
      type={type}
      className={twMerge(
        "rounded-full text-sm text-nowrap duration-160 hover:scale-96",
        disabled && "opacity-50 pointer-events-none",
        sizes[size],
        themes[theme],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  );
};

export default Button;
