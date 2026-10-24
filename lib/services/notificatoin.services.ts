import { Tx } from "@/types/prisma";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getNotificationById = (
  id: string,
  select: Prisma.NotificationSelect<DefaultArgs> = { id: true },
) => {
  return prisma.notification.findUnique({
    where: { id },
    select,
  });
};

export const markNotificationAsRead = ({ tx, id }: { tx?: Tx; id: string }) => {
  return (tx || prisma).notification.update({
    where: { id },
    data: { isRead: true },
    select: {
      id: true,
    },
  });
};

export const markAllNotificationsAsRead = ({ userId }: { userId: string }) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: { isRead: true },
  });
};

export const deleteNotifcation = (id: string) => {
  return prisma.notification.delete({ where: { id } });
};

export const deleteAllNotifications = ({ userId }: { userId: string }) => {
  return prisma.notification.deleteMany({
    where: {
      userId,
    },
  });
};

export const createInvitationNotification = (
  tx: Tx,
  userId: string,
  teamName: string,
  data: {
    invitationId: string;
    teamId: string;
  },
) => {
  return tx.notification.create({
    data: {
      userId,
      type: "TEAM_INVITATION",
      message: `You've been to join ${teamName} team`,
      data,
    },
  });
};
