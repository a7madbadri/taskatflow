"use client";

import Button from "@/components/Button";
import {
  acceptTeamInvitationAction,
  declineTeamInvitationAction,
  deleteNotifcationAction,
  markNotificationAsReadAction,
} from "@/lib/actions/notification.actions";
import {
  AppNotification,
  TeamInvitationNotification,
} from "@/types/notifications";
import { foramtDate } from "@/utils";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import NotificationMenu from "./NotificationMenu";

function Notification({ notification }: { notification: AppNotification }) {
  const { execute: deleteExecute, status: deletingStatus } = useAction(
    deleteNotifcationAction,
    {
      onSuccess({ data }) {
        if (data.success) {
          toast.success("Notification deleted");
        } else if (!data.success && data.message) {
          toast.error(data.message);
        }
      },
    },
  );
  const { execute: markAsReadExecute, status: markAsReadStatus } = useAction(
    markNotificationAsReadAction,
    {
      onSuccess({ data }) {
        if (!data.success && data.message) {
          toast.error(data.message);
        }
      },
    },
  );
  switch (notification.type) {
    case "TEAM_INVITATION":
      return (
        <InvitationNotification
          {...notification}
          deleting={{
            execute: () => deleteExecute({ notificationId: notification.id }),
            isPending: deletingStatus === "executing",
          }}
          markAsRead={{
            execute: () =>
              markAsReadExecute({ notificationId: notification.id }),
            isPending: markAsReadStatus === "executing",
          }}
        />
      );
  }
}

const InvitationNotification = ({
  id,
  message,
  createdAt,
  isRead,
  data: { invitationId, status },
  deleting,
  markAsRead,
}: TeamInvitationNotification & {
  deleting: { execute: () => void; isPending: boolean };
  markAsRead: { execute: () => void; isPending: boolean };
}) => {
  const { execute: acceptExecute, status: acceptingStatus } = useAction(
    acceptTeamInvitationAction,
    {
      onSuccess({ data }) {
        if (data?.success) {
          toast.success("You're now a member of the team");
        } else if (data?.message) {
          toast.error(data.message);
        }
      },
    },
  );
  const { execute: declineExecute, status: decliningStatus } = useAction(
    declineTeamInvitationAction,
    {
      onSuccess({ data }) {
        if (data?.success) {
          toast.success("Invitation has been declined");
        } else if (data?.message) {
          toast.error(data.message);
        }
      },
    },
  );
  const isAcceptingPending = acceptingStatus === "executing";
  const isDecliningPending = decliningStatus === "executing";
  return (
    <div
      className={`text-sm p-3 not-last:border-b hover:bg-slate-100 ${!isRead ? "text-slate-900 bg-slate-100" : "text-slate-500"} ${deleting.isPending ? "is-disable" : ""}`}
    >
      <p className="">{message}</p>
      <div className="flex gap-2 mt-2">
        {status === "PENDING" ? (
          <>
            {!isDecliningPending && (
              <Button
                size="small"
                theme="primary"
                onClick={() => {
                  acceptExecute({ notificationId: id, invitationId });
                }}
                disabled={isAcceptingPending}
              >
                {isAcceptingPending ? "Accepting..." : "Accept"}
              </Button>
            )}
            {!isAcceptingPending && (
              <Button
                size="small"
                onClick={() =>
                  declineExecute({ notificationId: id, invitationId })
                }
                disabled={isDecliningPending}
              >
                {isDecliningPending ? "Declining" : "Decline"}
              </Button>
            )}
          </>
        ) : status === "ACCEPTED" ? (
          <i>You&apos;ve accepted the invitation</i>
        ) : status === "DECLINED" ? (
          <i>You&apos;ve declined the invitation</i>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-600">{foramtDate(createdAt)}</span>
        <NotificationMenu
          onMarkAsRead={!isRead ? () => markAsRead.execute() : undefined}
          onDelete={() => deleting.execute()}
        />
      </div>
    </div>
  );
};

export default Notification;
