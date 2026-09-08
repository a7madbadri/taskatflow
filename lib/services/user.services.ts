import prisma from "../prisma";

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
