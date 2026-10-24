import { CreateTaskInput, EditTaskInput } from "@/schemas/task";
import prisma from "../prisma";

export const getTaskById = (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};

/** Create a new personal task */
export const createTask = (
  data: CreateTaskInput,
  userId: string | null,
  teamId: string | null = null,
) => {
  return prisma.task.create({ data: { ...data, userId, teamId } });
};

export const toggleTaskStatus = (id: string, isDone: boolean) => {
  return prisma.task.update({ where: { id }, data: { isDone: !isDone } });
};

export const editTask = ({ id, title, description }: EditTaskInput) => {
  return prisma.task.update({
    where: { id },
    data: { title, description },
  });
};

export const deleteTask = (id: string) => {
  return prisma.task.delete({ where: { id } });
};
