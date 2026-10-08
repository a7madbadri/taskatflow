import prisma from "../prisma";

export const createTeam = (data: { name: string; description?: string }) => {
  return prisma.team.create({ data });
};

export const getTeamById = (id: string) => {
  return prisma.team.findUnique({ where: { id } });
};

export const addUser = (data: { teamId: string; userId: string }) => {
  return prisma.membership.create({
    data,
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
