"use client";

import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav({ isExpanded }: { isExpanded: boolean }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1">
      <ul>
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === link.href
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <li
              key={link.label}
              className={`h-12 ${active ? "text-indigo-600" : "text-slate-700"}`}
            >
              <Link
                href={link.href}
                className="flex items-center duration-150 hover:bg-white/40"
              >
                <span className="size-12 min-w-12 grid place-items-center">
                  <Icon size={20} />
                </span>
                <label
                  className={`duration-150 pointer-events-none ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
                >
                  {link.label}
                </label>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
