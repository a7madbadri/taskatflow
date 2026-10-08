"use client";

import { handleOutsideClick } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import HeaderMenu, { HeaderMenuProps } from "./HeaderMenu";

type Option = {
  label: string;
  action: () => void;
};

interface Props {
  title: string;
  fallbackPath?: string;
  headerMenuProps?: HeaderMenuProps;
  className?: string;
}

function Header({
  title,
  fallbackPath = "/",
  headerMenuProps,
  className,
}: Props) {
  const router = useRouter();
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const handleBack = () => {
    if (
      window.history.length > 1 &&
      document.referrer.includes(window.location.host)
    ) {
      router.back();
    } else {
      router.push(fallbackPath);
    }
  };
  return (
    <header
      className={twMerge(
        "main-card h-12 flex items-center px-2 gap-2 sticky top-0 z-1",
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
    </header>
  );
}

export default Header;
