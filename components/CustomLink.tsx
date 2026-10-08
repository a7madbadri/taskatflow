import Link, { LinkProps } from "next/link";
import { ComponentPropsWithRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { string } from "zod";

type CustomLinkProps = {
  children: ReactNode;
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
  disabled?: boolean;
} & LinkProps &
  ComponentPropsWithRef<"a">;

const CustomLink = ({
  children,
  className,
  theme = "default",
  size = "small",
  disabled = false,
  ...props
}: CustomLinkProps) => {
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
    <Link
      className={twMerge(
        "rounded-full text-sm text-nowrap flex items-center duration-160 hover:scale-96",
        disabled && "opacity-50 pointer-events-none",
        sizes[size],
        themes[theme],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
