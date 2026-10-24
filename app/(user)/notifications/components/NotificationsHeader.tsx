"use client";

import Header from "@/components/Header";
import HeaderMenu from "./HeaderMenu";
import { useAction } from "next-safe-action/hooks";
import {
  deleteAllNotificationsAction,
  markAllNotificationsAsReadAction,
} from "@/lib/actions/notification.actions";
import { toast } from "sonner";

function NotificationsHeader({
  isThereNotifications,
}: {
  isThereNotifications: boolean;
}) {
  const { execute: markAllAsReadExecute } = useAction(
    markAllNotificationsAsReadAction,
    {
      onSuccess({ data }) {
        if (!data.success && data.message) {
          toast.error(data.message);
        }
      },
    },
  );
  const { execute: deleteAllExecute } = useAction(
    deleteAllNotificationsAction,
    {
      onSuccess({ data }) {
        if (data.success) {
          toast.success("All notifications has been deleted");
        } else if (!data.success && data.message) {
          toast.error(data.message);
        }
      },
    },
  );
  return (
    <Header
      title="Notifications"
      className="mb-4"
      More={
        isThereNotifications
          ? () =>
              HeaderMenu({
                onDeleteAll: () => deleteAllExecute(),
                onMarkAllAsRead: () => markAllAsReadExecute(),
              })
          : undefined
      }
    />
  );
}

export default NotificationsHeader;
