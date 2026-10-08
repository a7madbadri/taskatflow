"use client";

import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { usePathname } from "next/navigation";
import { handleOutsideClick } from "@/utils";

function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setisExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setisExpanded(false), 0);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClicksFn = (e: MouseEvent) =>
      handleOutsideClick<HTMLDivElement>(sidebarRef, e, () =>
        setisExpanded(false),
      );
    document.addEventListener("mousedown", handleOutsideClicksFn);

    return () =>
      document.removeEventListener("mousedown", handleOutsideClicksFn);
  }, []);

  return (
    <aside
      className={`main-card flex flex-col lg:w-full overflow-hidden duration-150 z-10  ${isExpanded ? "w-64 shadow-[0_0_20px_-2px_#00000055]" : "w-12"}`}
      ref={sidebarRef}
    >
      <div className="mb-2 px-3 flex items-center relative h-12">
        <h1
          className={`font-bold text-lg text-indigo-600 duration-150 ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
        >
          TaskatFlow
        </h1>
        <button
          className={`size-9 grid place-items-center text-indigo-600 rounded-full absolute right-1.5 lg:hidden duration-150 hover:bg-white/50 ${isExpanded ? "" : ""}`}
          onClick={() => setisExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <PanelLeftClose size={22} />
          ) : (
            <PanelLeftOpen size={22} />
          )}
        </button>
      </div>
      <Nav isExpanded={isExpanded} />
      <div className="">
        <div className="h-12 text-slate-700 flex items-center mb-2 duration-150 hover:bg-white/40">
          <span className="size-12 min-w-12 grid place-items-center text-slate-700">
            <Bell size={20} />
          </span>
          <label
            className={`duration-150 pointer-events-none ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
          >
            Notifications
          </label>
        </div>
        <div className="mb-3 px-2 flex items-center gap-2">
          <Image
            src="/images/profile.png"
            alt="profile pic"
            width={32}
            height={32}
            className="rounded-full"
          />
          <p>a7madbadri</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
