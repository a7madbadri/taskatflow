"use client";

import { ChevronLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  fallbackPath?: string;
  className?: string;
}

function Header({ title, fallbackPath = "/", className }: Props) {
  const router = useRouter();

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
        "h-12 bg-indigo-200 rounded-xl flex items-center px-2 gap-2 sticky top-0 z-1",
        className,
      )}
    >
      <button
        className="size-8 rounded-full grid place-items-center duration-150 hover:bg-white/50"
        onClick={handleBack}
      >
        <ChevronLeft size={22} />
      </button>
      <h3 className="flex-1">{title}</h3>
      <button className="size-8 rounded-full grid place-items-center duration-150 hover:bg-white/50">
        <MoreVertical size={22} />
      </button>
    </header>
  );
}

export default Header;
