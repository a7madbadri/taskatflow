import { auth } from "@/auth";
import Header from "@/components/Header";
import { getNotifications, isNotificationsFilter } from "@/utils/notifications";
import { redirect } from "next/navigation";
import Link from "next/link";
import Notification from "./components/Notification";
import { NotificationsFilters } from "@/types/notifications";
import prisma from "@/lib/prisma";
import Nav from "./components/Nav";
import { Bell } from "lucide-react";
import NotificationsHeader from "./components/NotificationsHeader";

type Props = {
  searchParams: Promise<{ filter?: NotificationsFilters }>;
};

async function page({ searchParams }: Props) {
  const params = await searchParams;
  const filter =
    params.filter && isNotificationsFilter(params.filter)
      ? params.filter
      : "all";
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const notifications = await getNotifications(session.user.id);
  const notificationsCounts = prisma.notification.findMany({
    select: { type: true, isRead: true },
  });
  return (
    <>
      <NotificationsHeader isThereNotifications={notifications.length > 0} />
      <div className="w-full max-w-l mx-auto py-5 main-card flex-1 overflow-hidden flex flex-col">
        <Nav filter={filter} countsPromise={notificationsCounts} />
        {notifications.length > 0 ? (
          <div className="overflow-auto flex-1 scrollbar-hide">
            {notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <span className="rotate-12 grid place-items-center size-16 ">
              <Bell size={60} />
            </span>
            <p>You&apos;ve no notifications</p>
          </div>
        )}
      </div>
    </>
  );
}

export default page;
