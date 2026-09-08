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
        message: "unauthorized",
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
    const task = await getTaskById(id);
    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }
    await toggleTaskStatus(id, task.isDone);
    revalidatePath("/");
    return {
      success: true,
    };
  });

export const editTaskAction = actionClient
  .inputSchema(editTaskSchema)
  .action(async ({ parsedInput }) => {
    const task = await getTaskById(parsedInput.id);
    if (!task)
      return {
        success: false,
        message: "Task not found",
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
    const task = await getTaskById(id);
    if (!task)
      return {
        success: false,
        message: "Task not found",
      };
    await deleteTask(id);
    revalidatePath("/");
    return {
      success: true,
    };
  });
