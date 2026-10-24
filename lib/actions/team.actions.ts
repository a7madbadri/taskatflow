"use server";

import { createEditTeamTaskSchema, createTeamSchema } from "@/schemas/team";
import { actionClient } from "../safe-action";
import { auth } from "@/auth";
import {
  addUser,
  createAssignments,
  createTeam,
  getAssignmentById,
  getMembership,
  getTeamById,
  inviteUser,
  removeMember,
  toggleAssignmentStatus,
} from "../services/team.services";
import { createMembership } from "../services/membership.services";
import { revalidatePath } from "next/cache";
import z from "zod";
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
} from "../services/task.services";
import { getUserById } from "../services/user.services";

export const createTeamAction = actionClient
  .inputSchema(createTeamSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };

    await createTeam(parsedInput, session.user.id);
    revalidatePath("/teams");
    return {
      success: true,
    };
  });

//! Retfactor in next version
export const inviteUserAction = actionClient
  .inputSchema(
    z.object({
      userId: z.string(),
      teamId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { userId, teamId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const team = await getTeamById({ id: teamId, select: { name: true } });
    if (!team)
      return {
        success: false,
        message: "Team isn't exists",
      };
    const membership = await getMembership({ teamId, userId: session.user.id });
    if (!membership)
      return {
        success: false,
        message: "You're not a member in team",
      };
    if (membership.role !== "OWNER")
      return {
        success: false,
        message: "Only team owner can invite other users",
      };
    const invitee = await getUserById({ id: userId });
    if (!invitee)
      return {
        success: false,
        message: "This user isn't exists",
      };
    const inviteeMembership = await getMembership({ teamId, userId });
    if (inviteeMembership)
      return {
        success: false,
        message: "This user is already a member in this team",
      };

    await inviteUser(session.user.id, userId, teamId, team.name);
    return {
      success: true,
    };
  });

export const removeMemberAction = actionClient
  .inputSchema(
    z.object({
      userId: z.string(),
      teamId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { userId, teamId } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const membership = await getMembership({ teamId, userId: session.user.id });
    if (!membership || membership.role !== "OWNER")
      return {
        success: false,
        message: "Unauthorized",
      };
    const userMembership = await getMembership({ teamId, userId });
    if (!userMembership)
      return {
        success: false,
        message: "This user isn't a member",
      };
    await removeMember(userMembership.id, teamId);
    revalidatePath(`/team/${teamId}`);
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
      const team = await getTeamById({ id: teamId });
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
    const team = await getTeamById({ id: teamId });
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
