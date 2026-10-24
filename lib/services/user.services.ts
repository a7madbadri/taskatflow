import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getUserById = ({
  id,
  where,
  select,
}: {
  id: string;
  where?: Prisma.UserWhereInput;
  select?: Prisma.UserSelect<DefaultArgs> | null | undefined;
}) => {
  return prisma.user.findFirst({
    where: { ...where, id },
    select: { id: true, ...select },
  });
};

export const searchUsers = (userId: string, teamId: string, query: string) => {
  return prisma.user.findMany({
    where: {
      id: { not: userId },
      memberships: { none: { teamId } },
      email: { contains: query, mode: "insensitive" },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      receivedInvitaions: {
        where: {
          teamId,
          status: "PENDING",
        },
        select: {
          id: true,
        },
      },
    },
    take: 8,
  });
};
