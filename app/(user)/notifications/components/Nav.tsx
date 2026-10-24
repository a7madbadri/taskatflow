"use client";

import { NotificationsFilters } from "@/types/notifications";
import { NotificationType, PrismaPromise } from "@prisma/client";
import Link from "next/link";
import { use } from "react";

function Nav({
  filter,
  countsPromise,
}: {
  filter: NotificationsFilters;
  countsPromise: PrismaPromise<{ type: NotificationType; isRead: boolean }[]>;
}) {
  const counts = use(countsPromise);
  const unreadNotifications = counts.filter((n) => !n.isRead);
  const unreadCount = unreadNotifications.length;
  const teamsUnreadCount = unreadNotifications.filter(
    (n) => n.type === "TEAM_INVITATION",
  ).length;
  return (
    <div className="text-sm flex h-8 rounded-md overflow-hidden w-fit mx-auto mb-2 bg-slate-200 border border-slate-200">
      <Link
        href="/notifications?filter=all"
        className={`h-full leading-8 w-24.5 text-center rounded-md ${filter === "all" ? "bg-white text-indigo-600" : "text-slate-600"}`}
      >
        All{" "}
        {unreadCount > 0 && <span className="font-medium">{unreadCount}</span>}
      </Link>
      <Link
        href="/notifications?filter=teams"
        className={`h-full leading-8 w-24.5 text-center rounded-md ${filter === "teams" ? "bg-white text-indigo-600" : "text-slate-600"}`}
      >
        Teams{" "}
        {teamsUnreadCount > 0 && (
          <span className="font-medium">{teamsUnreadCount}</span>
        )}
      </Link>
    </div>
  );
}

export default Nav;
