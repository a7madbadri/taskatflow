"use client";

import { IconType } from "@/lib/types";
import { Eye, EyeClosed } from "lucide-react";
import { ComponentPropsWithRef, JSX, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps extends ComponentPropsWithRef<"input"> {
  type?: string;
  name?: string;
  id?: string;
  Icon?: IconType;
  theme?: "light" | "medium" | "dark";
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
}

const InputField = ({
  type = "text",
  Icon,
  name,
  id,
  theme = "light",
  value,
  setValue,
  placeholder,
  className,
  disabled = false,
  ref,
  onFocus,
  onBlur,
  maxLength,
}: InputFieldProps): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const themes = {
    light: "border-slate-300 hover:border-primary hover:border-dark-primary",
    medium: `text-slate-800 hover:border-indigo-600 ${focus ? "border-indigo-600" : "border-slate-400"}`,
    dark: "border-slate-400 text-slate-300",
  };
  return (
    <div
      className={twMerge(
        "flex h-10 w-full text-sm rounded-full duration-150 border",
        themes[theme],
        className,
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {Icon && (
        <span
          className={`h-full w-10 grid place-items-center ${theme === "light" ? "text-black" : "text-white"}`}
        >
          <Icon size={18} />
        </span>
      )}
      <input
        className={`${Icon ? "" : "px-3"} min-w-0 flex-1`}
        type={type !== "password" ? type : passVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        placeholder={placeholder}
        ref={ref}
        onFocus={() => {
          setFocus(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocus(false);
          onBlur?.();
        }}
        maxLength={maxLength}
        id={id}
      />
      {maxLength && (
        <span className="text-xs h-full pl-2 flex items-center text-slate-500">
          {maxLength - value.length}
        </span>
      )}
      {type === "password" && (
        <button
          className="h-10 w-10 grid place-items-center cursor-pointer"
          type="button"
          onClick={() => setPassVisible((prev) => !prev)}
        >
          {passVisible ? <Eye fontSize={17} /> : <EyeClosed fontSize={17} />}
        </button>
      )}
    </div>
  );
};

export default InputField;
