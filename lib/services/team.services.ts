import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { createInvitation, createMembership } from "./membership.services";
import { createInvitationNotification } from "./notificatoin.services";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const createTeam = (
  data: { name: string; description?: string },
  ownerId: string,
) => {
  return prisma.$transaction(async (tx) => {
    const team = await tx.team.create({ data });
    await createMembership(tx, {
      teamId: team.id,
      userId: ownerId,
      role: "OWNER",
    });
  });
};

export const getTeamById = ({
  id,
  where,
  select,
}: {
  id: string;
  where?: Prisma.TeamWhereInput;
  select?: Prisma.TeamSelect<DefaultArgs> | null | undefined;
}) => {
  return prisma.team.findUnique({
    where: { ...where, id },
    select: { id: true, ...select },
  });
};

export const inviteUser = (
  inviterId: string,
  inviteeId: string,
  teamId: string,
  teamName: string,
) => {
  return prisma.$transaction(async (tx) => {
    const invitation = await createInvitation(tx, inviterId, inviteeId, teamId);
    await createInvitationNotification(tx, invitation.inviteeId, teamName, {
      invitationId: invitation.id,
      teamId,
    });
  });
};

export const addUser = (data: { teamId: string; userId: string }) => {
  return prisma.membership.create({
    data,
  });
};

export const removeMember = (id: string, teamId: string) => {
  return prisma.membership.delete({
    where: {
      id,
      teamId,
    },
  });
};

export const getMembership = (where: { teamId: string; userId: string }) => {
  return prisma.membership.findFirst({ where });
};

export const createAssignments = (
  taskId: string,
  teamId: string,
  members: string[],
) => {
  return prisma.assignment.createMany({
    data: members.map((member) => ({
      taskId,
      teamId,
      membershipId: member,
    })),
  });
};

export const getAssignmentById = (id: string) => {
  return prisma.assignment.findUnique({ where: { id } });
};

export const toggleAssignmentStatus = (id: string, isDone: boolean) => {
  return prisma.assignment.update({ where: { id }, data: { isDone } });
};
