"use server";

import {
  createEditTeamTaskSchema,
  createTeamSchema,
  createTeamTaskSchema,
  editTeamTaskSchema,
} from "@/schemas/team";
import { actionClient } from "../safe-action";
import { auth } from "@/auth";
import {
  addUser,
  createAssignments,
  createTeam,
  getAssignmentById,
  getMembership,
  getTeamById,
  toggleAssignmentStatus,
} from "../services/team.services";
import { createMembership } from "../services/membership.services";
import { revalidatePath } from "next/cache";
import z, { success } from "zod";
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
} from "../services/task.services";

export const createTeamAction = actionClient
  .inputSchema(createTeamSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const team = await createTeam(parsedInput);
    await createMembership({
      userId: session.user.id,
      teamId: team.id,
      role: "OWNER",
    });
    revalidatePath("/teams");
    return {
      success: true,
    };
  });

//! Retfactor in next version
export const addUserAction = actionClient
  .inputSchema(
    z.object({
      teamId: z.string(),
      userId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    await addUser(parsedInput);
    return {
      success: true,
    };
  });

export const createEditTeamTaskAction = actionClient
  .inputSchema(createEditTeamTaskSchema)
  .action(
    async ({
      parsedInput: { title, description, teamId, membersIds, taskId, edit },
    }) => {
      const session = await auth();
      if (!session)
        return {
          success: false,
          message: "Unauthenticated",
        };
      const team = await getTeamById(teamId);
      if (!team)
        return {
          success: false,
          message: "Team is not exist",
        };
      const membership = await getMembership({
        teamId,
        userId: session.user.id,
      });
      if (!membership)
        return {
          success: false,
          message: "You are not a member in this team",
        };
      if (membership.role !== "OWNER")
        return {
          success: false,
          message: "Unauthorized",
        };
      if (edit) {
        const task = await getTaskById(taskId!);
        if (!task)
          return {
            success: false,
            message: "Task is not found",
          };
        if (task.teamId !== teamId)
          return {
            success: false,
            message: "You can't edit task in another team",
          };
        await editTask({ id: taskId!, title, description });
        revalidatePath(`/teams/${teamId}`);
        return {
          success: true,
        };
      } else {
        const task = await createTask({ title, description }, null, teamId);
        if (!task)
          return {
            success: false,
            message: "Faild to create main task",
          };
        await createAssignments(task.id, teamId, membersIds);
        revalidatePath(`/teams/${teamId}`);
        return {
          success: true,
        };
      }
    },
  );

// export const createTeamTaskAction = actionClient
//   .inputSchema(createTeamTaskSchema)
//   .action(
//     async ({ parsedInput: { title, description, teamId, membersIds } }) => {
//       const session = await auth();
//       if (!session)
//         return {
//           success: false,
//           message: "Unauthenticated",
//         };
//       const membership = await getMembership({
//         teamId,
//         userId: session.user.id,
//       });
//       if (!membership || membership?.role !== "OWNER")
//         return {
//           success: false,
//           message: "Unauthorized",
//         };
//       const task = await createTask({ title, description }, null, teamId);
//       if (!task)
//         return {
//           success: false,
//           message: "Faild to create main task",
//         };
//       await createAssignments(task.id, teamId, membersIds);
//       revalidatePath(`/teams/${teamId}`);
//       return {
//         success: true,
//       };
//     },
//   );

// export const editTeamTaskAction = actionClient
//   .inputSchema(editTeamTaskSchema)
//   .action(async ({ parsedInput: { id, title, description, teamId } }) => {
//     const session = await auth();
//     if (!session)
//       return {
//         success: false,
//         message: "Unauthenticated",
//       };
//     const team = await getTeamById(teamId);
//     if (!team)
//       return {
//         success: false,
//         message: "Team is not exist",
//       };
//     const membership = await getMembership({ teamId, userId: session.user.id });
//     if (!membership)
//       return {
//         success: false,
//         message: "You are not a member in this team",
//       };
//     if (membership.role !== "OWNER")
//       return {
//         success: false,
//         message: "Unauthorized",
//       };
//     const task = await getTaskById(id);
//     if (!task)
//       return {
//         success: false,
//         message: "Task is not found",
//       };
//     if (task.teamId !== teamId)
//       return {
//         success: false,
//         message: "You can't edit task in another team",
//       };
//     await editTask({ id, title, description });
//     revalidatePath(`/teams/${teamId}`);
//     return {
//       success: true,
//     };
//   });

export const toggleAssignmentStatusAction = actionClient
  .inputSchema(
    z.object({
      id: z.string().min(1),
      teamId: z.string().min(1),
      membershipId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { id, teamId, membershipId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };

    const assignment = await getAssignmentById(id);
    if (!assignment)
      return {
        success: false,
        message: "Assignment not found",
      };
    if (assignment.teamId !== teamId)
      return {
        success: false,
        message: "You cant't update assignment from different team",
      };
    if (assignment.membershipId !== membershipId)
      return {
        success: false,
        message: "Unauthorized",
      };

    await toggleAssignmentStatus(id, !assignment.isDone);
    revalidatePath(`/team/${teamId}`);
    return {
      success: true,
    };
  });

export const deleteTeamTaskAction = actionClient
  .inputSchema(z.object({ teamId: z.string(), taskId: z.string() }))
  .action(async ({ parsedInput: { teamId, taskId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const team = await getTeamById(teamId);
    if (!team)
      return {
        success: false,
        message: "Team is not exist",
      };
    const membership = await getMembership({
      teamId,
      userId: session.user.id,
    });
    if (!membership)
      return {
        success: false,
        message: "You are not a member in this team",
      };
    if (membership.role !== "OWNER")
      return {
        success: false,
        message: "Unauthorized",
      };
    const task = await getTaskById(taskId!);
    if (!task)
      return {
        success: false,
        message: "Task is not found",
      };
    if (task.teamId !== teamId)
      return {
        success: false,
        message: "You can't edit task in another team",
      };
    await deleteTask(taskId);
    revalidatePath(`/teams/${teamId}`);
    return {
      success: true,
    };
  });
