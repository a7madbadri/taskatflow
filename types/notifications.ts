import { InvitationStatus } from "@prisma/client";

export type NotificationsFilters = "all" | "teams";

export type NotificationDataMap = {
  TEAM_INVITATION: {
    invitationId: string;
    teamId: string;
  };
  TEAM_INVITATION_AA: {
    invitationId: string;
    teamId: string;
  };
};
export type InvitationData = {
  invitationId: string;
  teamId: string;
  status: InvitationStatus;
};

type NotificationBase = {
  id: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
};

export type TeamInvitationNotification = NotificationBase & {
  type: "TEAM_INVITATION";
  data: InvitationData;
};

type NonNotification = NotificationBase & {
  type: "NON";
};

export type AppNotification = TeamInvitationNotification | NonNotification;
