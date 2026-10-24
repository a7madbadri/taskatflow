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
              className={`h-10 ${active ? "text-indigo-600" : "text-slate-700"}`}
            >
              <Link
                href={link.href}
                className={`h-full flex items-center duration-150 ${active ? "bg-indigo-100" : "hover:bg-slate-100"}`}
              >
                <span className="min-w-11.5 h-10 bg-slae-600 grid place-items-center">
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
