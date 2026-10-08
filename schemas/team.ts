import z from "zod";
import { createTaskSchema, editTaskSchema } from "./task";

export const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Team name can't be empty")
    .max(64, "Name can't more than 64 characters"),
  description: z.string().trim().optional(),
});

export const createTeamTaskSchema = createTaskSchema.extend({
  teamId: z.string().min(1, "Team ID can't be empty"),
  membersIds: z.array(z.string()),
});

export const editTeamTaskSchema = editTaskSchema.extend({
  teamId: z.string(),
  membershipId: z.string(),
});

export const createEditTeamTaskSchema = createTaskSchema.extend({
  taskId: z.string().optional(),
  teamId: z.string().min(1, "Team ID can't be empty"),
  membersIds: z.array(z.string()),
  edit: z.boolean(),
});

//? Types
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type CreateTeamTaskInput = z.infer<typeof createTeamTaskSchema>;
export type CreateEditTeamTaskInput = z.infer<typeof createEditTeamTaskSchema>;
