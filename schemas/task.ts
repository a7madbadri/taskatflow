import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().trim().min(1, "Task description is required"),
});

export const editTaskSchema = z.object({
  id: z.string().trim().min(1, "Task ID is required"),
  title: z.string().trim().min(1, "Task title can't be empty"),
  description: z.string().trim().min(1, "Task description can't be empty"),
});

//? Types
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type EditTaskInput = z.infer<typeof editTaskSchema>;
