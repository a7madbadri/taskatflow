import { Role } from "@prisma/client";
import prisma from "../prisma";

export const createMembership = (data: {
  userId: string;
  teamId: string;
  role: Role;
}) => {
  return prisma.membership.create({ data });
};
