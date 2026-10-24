"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import HeaderMenu, { HeaderMenuProps } from "./HeaderMenu";
import { JSX } from "react/jsx-runtime";

interface Props {
  title: string;
  fallbackPath?: string;
  headerMenuProps?: HeaderMenuProps;
  className?: string;
  More?: () => JSX.Element;
}

function Header({
  title,
  fallbackPath = "/",
  headerMenuProps,
  className,
  More,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackPath);
    }
  };
  return (
    <header
      className={twMerge(
        "main-card min-h-12 flex items-center px-2 gap-2 sticky top-0 z-1",
        className,
      )}
    >
      <button
        className="size-8 rounded-full grid place-items-center duration-150 hover:bg-slate-100"
        onClick={handleBack}
      >
        <ChevronLeft size={22} />
      </button>
      <h3 className="flex-1">{title}</h3>
      {headerMenuProps && <HeaderMenu {...headerMenuProps} />}
      {More && <More />}
    </header>
  );
}

export default Header;
