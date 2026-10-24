import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export function buildTaskWhere(
  userId: string,
  filter: TaskFilters,
): Prisma.TaskWhereInput {
  return {
    userId,
    ...(filter === "active" && {
      isDone: false,
    }),
    ...(filter === "completed" && {
      isDone: true,
    }),
  };
}

export function isTaskFilter(value: string): value is TaskFilters {
  const validFilters = ["all", "active", "completed"] as const;
  return validFilters.some((filter) => filter === value);
}

export async function getUserTasks(userId: string, filter: TaskFilters) {
  return prisma.task.findMany({
    where: buildTaskWhere(userId, filter),
    orderBy: { createdAt: "desc" },
  });
}
