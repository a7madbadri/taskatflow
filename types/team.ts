import { getMyMemberships } from "@/utils/team";

export type MyMembershipType = Awaited<
  ReturnType<typeof getMyMemberships>
>[number];

export interface NormalizedAssignment {
  id: string;
  teamId: string;
  membershipId: string;
  taskId: string;
  title: string;
  description: string;
  isDone: boolean;
  assignments: {
    isDone: boolean;
  }[];
  createdAt: Date;
}
