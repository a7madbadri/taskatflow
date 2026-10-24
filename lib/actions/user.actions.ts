"use server";

import z from "zod";
import { actionClient } from "../safe-action";
import { auth } from "@/auth";
import { searchUsers } from "../services/user.services";

export const searchUsersAction = actionClient
  .inputSchema(
    z.object({
      teamId: z.string(),
      query: z
        .string()
        .trim()
        .min(2, "You must type 2 letters or more to search"),
    }),
  )
  .action(async ({ parsedInput: { teamId, query } }) => {
    const session = await auth();
    if (!session)
      return {
        success: false,
        message: "Unauthenticated",
      };
    const users = await searchUsers(session.user.id, teamId, query);
    return {
      success: true,
      data: users,
    };
  });
