import prisma from "@/lib/prisma";
import {
  AppNotification,
  NotificationDataMap,
  NotificationsFilters,
} from "@/types/notifications";

export function isNotificationsFilter(
  value: string,
): value is NotificationsFilters {
  const validFilters = ["all", "teams"] as const;
  return validFilters.some((filter) => filter === value);
}

export const getNotifications = (
  userId: string,
): Promise<AppNotification[]> => {
  return prisma.$transaction(async () => {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    const invitations = notifications
      .filter((n) => n.type === "TEAM_INVITATION")
      .map((n) => ({
        notificationId: n.id,
        ...(n.data as NotificationDataMap["TEAM_INVITATION"]),
      }));
    const invitationsStatus = await prisma.invitation.findMany({
      where: {
        id: { in: invitations.map((i) => i.invitationId) },
      },
      select: {
        id: true,
        status: true,
      },
    });
    const formatted: AppNotification[] = [];

    for (const notification of notifications) {
      switch (notification.type) {
        case "TEAM_INVITATION":
          const invitation = invitations.find(
            (inv) => inv.notificationId === notification.id,
          );
          if (!invitation) continue;
          const { invitationId, teamId } = invitation;
          const status = invitationsStatus.find(
            (inv) => inv.id === invitationId,
          );
          formatted.push({
            ...notification,
            type: "TEAM_INVITATION",
            data: {
              invitationId,
              teamId,
              status: status?.status || "PENDING",
            },
          });
          break;

        case "NON":
          formatted.push({
            ...notification,
            type: "NON",
          });
          break;
      }
    }

    return formatted;
  });
};
