"use server";

import { createTaskSchema, editTaskSchema } from "@/schemas/task";
import { actionClient } from "../safe-action";
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
  toggleTaskStatus,
} from "../services/task.services";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@/auth";

export const createTaskAction = actionClient
  .inputSchema(createTaskSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const {
      user: { id },
    } = session;
    await createTask(parsedInput, id);
    revalidatePath("/");
    return {
      success: true,
    };
  });

export const toggleTaskStatusAction = actionClient
  .inputSchema(z.object({ id: z.string().min(1) }))
  .action(async ({ parsedInput: { id } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const task = await getTaskById(id);
    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }
    if (task.userId !== session.user.id)
      return {
        success: false,
        message: "Unauthorized",
      };
    await toggleTaskStatus(id, task.isDone);
    revalidatePath("/");
    return {
      success: true,
    };
  });

export const editTaskAction = actionClient
  .inputSchema(editTaskSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const task = await getTaskById(parsedInput.id);
    if (!task)
      return {
        success: false,
        message: "Task not found",
      };
    if (task.userId !== session.user.id)
      return {
        success: false,
        message: "Unauthorized",
      };
    await editTask(parsedInput);
    revalidatePath("/");
    return {
      success: true,
    };
  });

export const deleteTaskAction = actionClient
  .inputSchema(z.object({ id: z.string().min(1) }))
  .action(async ({ parsedInput: { id } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const task = await getTaskById(id);
    if (!task)
      return {
        success: false,
        message: "Task not found",
      };
    if (task.userId !== session.user.id)
      return {
        success: false,
        message: "Unauthorized",
      };
    await deleteTask(id);
    revalidatePath("/");
    return {
      success: true,
    };
  });
