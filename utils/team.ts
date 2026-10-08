import prisma from "@/lib/prisma";

export const getMyMemberships = async (userId: string) => {
  return prisma.membership.findMany({
    where: { userId: userId },
    include: { team: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
};
