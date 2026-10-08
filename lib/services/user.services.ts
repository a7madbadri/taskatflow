import prisma from "../prisma";

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
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
    },
    take: 8,
  });
};
