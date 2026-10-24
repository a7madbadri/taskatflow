import { Prisma, Role } from "@prisma/client";
import prisma from "../prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Tx } from "@/types/prisma";
import { markNotificationAsRead } from "./notificatoin.services";

export const createInvitation = (
  tx: Tx,
  inviterId: string,
  inviteeId: string,
  teamId: string,
) => {
  return tx.invitation.create({
    data: {
      inviterId,
      inviteeId,
      teamId,
    },
  });
};

export const getInvitationById = ({
  id,
  where,
  select,
}: {
  id: string;
  where?: Prisma.InvitationWhereInput;
  select?: Prisma.InvitationSelect<DefaultArgs> | null | undefined;
}) => {
  return prisma.invitation.findUnique({
    where: { ...where, id },
    select: { id: true, ...select },
  });
};

export const acceptTeamInvitation = (
  id: string,
  notificationId: string,
  memberdata: { userId: string; teamId: string; role: Role },
) => {
  return prisma.$transaction(async (tx) => {
    const membership = await createMembership(tx, memberdata);
    if (!membership) {
      throw new Error("Unable to create a membership");
    }
    const invitation = await tx.invitation.update({
      where: { id },
      data: { status: "ACCEPTED" },
    });
    if (!invitation) throw new Error("Can't accept an invitation");
    const notification = await markNotificationAsRead({
      tx,
      id: notificationId,
    });
    if (!notification) throw new Error("Error while dealing with notification");
    return {
      success: true,
    };
  });
};

export const declineTeamInvitation = (id: string, notificationId: string) => {
  return prisma.$transaction(async (tx) => {
    const invitation = await tx.invitation.update({
      where: { id },
      data: { status: "DECLINED" },
    });
    console.log(invitation);
    if (!invitation) throw new Error("Can't decline the invitation");
    const notification = await markNotificationAsRead({
      tx,
      id: notificationId,
    });
    if (!notification) throw new Error("Error while dealing with notification");
    return {
      success: true,
    };
  });
};

export const createMembership = (
  tx: Tx,
  data: {
    userId: string;
    teamId: string;
    role: Role;
  },
) => {
  return prisma.membership.create({ data });
};
