"use server";

import z from "zod";
import { actionClient } from "../safe-action";
import { auth } from "@/auth";
import {
  deleteAllNotifications,
  deleteNotifcation,
  getNotificationById,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notificatoin.services";
import { InvitationData, NotificationDataMap } from "@/types/notifications";
import {
  acceptTeamInvitation,
  declineTeamInvitation,
  getInvitationById,
} from "../services/membership.services";
import { getMembership, getTeamById } from "../services/team.services";
import { revalidatePath } from "next/cache";
import { getUserById } from "../services/user.services";

export const markNotificationAsReadAction = actionClient
  .inputSchema(z.object({ notificationId: z.string().nonoptional() }))
  .action(async ({ parsedInput: { notificationId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const user = await getUserById({
      id: session?.user.id,
      select: {
        notifications: {
          where: { id: notificationId },
          select: { id: true },
        },
      },
    });
    if (!user)
      return {
        success: false,
        message: "User isn't exist",
      };
    if (!user.notifications[0])
      return {
        success: false,
        message: "Notification isn't exist",
      };
    await markNotificationAsRead({ id: notificationId });
    revalidatePath("/notifications");
    return {
      success: true,
    };
  });

export const markAllNotificationsAsReadAction = actionClient.action(
  async () => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };

    await markAllNotificationsAsRead({ userId: session.user.id });
    revalidatePath("/notifications");
    return {
      success: true,
    };
  },
);

export const deleteAllNotificationsAction = actionClient.action(async () => {
  const session = await auth();
  if (!session)
    return {
      success: false,
      message: "Unauthenticated",
    };
  await deleteAllNotifications({
    userId: session.user.id,
  });
  revalidatePath("/notifications");
  return {
    success: true,
  };
});

export const deleteNotifcationAction = actionClient
  .inputSchema(
    z.object({
      notificationId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { notificationId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const user = await getUserById({
      id: session.user.id,
      select: {
        notifications: {
          where: { id: notificationId },
          select: { id: true },
        },
      },
    });
    if (!user)
      return {
        success: false,
        message: "This user isn't exist",
      };
    const notification = user.notifications[0];
    if (!notification)
      return {
        success: false,
        message: "This notification isn't exist",
      };
    await deleteNotifcation(notificationId);
    revalidatePath("/notifications");
    return {
      success: true,
    };
  });

export const acceptTeamInvitationAction = actionClient
  .inputSchema(
    z.object({
      notificationId: z.string(),
      invitationId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { notificationId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const notification = await getNotificationById(notificationId, {
      type: true,
      data: true,
    });
    if (!notification)
      return {
        success: false,
        message: "Notification not found",
      };

    const { invitationId, teamId } =
      notification.data as NotificationDataMap["TEAM_INVITATION"];
    const membership = await getMembership({ teamId, userId: session.user.id });
    if (membership)
      return {
        success: false,
        message: "You are already a member in this team",
      };
    const invitation = await getInvitationById({
      id: invitationId,
      where: { status: "PENDING" },
    });
    if (!invitation)
      return {
        success: false,
        message: "Invalid invitation",
      };

    await acceptTeamInvitation(invitationId, notificationId, {
      userId: session.user.id,
      teamId,
      role: "MEMBER",
    });
    revalidatePath("/notifications");
    return {
      success: true,
    };
  });

export const declineTeamInvitationAction = actionClient
  .inputSchema(
    z.object({
      notificationId: z.string(),
      invitationId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { notificationId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const user = await getUserById({
      id: session.user.id,
      select: {
        notifications: {
          where: { id: notificationId },
          select: { id: true, data: true },
        },
      },
    });
    if (!user)
      return {
        success: false,
        message: "This user isn't exist",
      };
    if (!user.notifications[0])
      return {
        success: false,
        message: "Notification isn't exist",
      };
    const { invitationId, teamId } = user.notifications[0]
      .data as InvitationData;
    const team = await getTeamById({
      id: teamId,
      select: {
        invitations: {
          where: { id: invitationId },
          select: { id: true, status: true },
        },
      },
    });
    if (!team)
      return {
        success: false,
        message: "Team isn't exist",
      };
    const invitation = team.invitations[0];
    if (!invitation)
      return {
        success: false,
        message: "Invitation isn't exist",
      };
    switch (invitation.status) {
      case "ACCEPTED":
        return {
          success: false,
          message: "Invitation is already accepted",
        };
      case "DECLINED":
        return {
          success: false,
          message: "Invitation is already diclined",
        };
      case "REVOKED":
        return {
          success: false,
          message: "Invitation has been revoked",
        };
    }
    const result = await declineTeamInvitation(invitationId, notificationId);
    if (!result.success)
      return {
        success: false,
        message: "Something went wrong",
      };
    revalidatePath("/notifications");
    return {
      success: true,
    };
  });
