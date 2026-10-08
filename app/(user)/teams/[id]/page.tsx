import React, { Suspense } from "react";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import TeamInfo from "../components/TeamInfo";
import TeamTasks from "../components/TeamTasks";
import { NormalizedAssignment } from "@/types/team";

interface Props {
  params: Promise<{ id: string }>;
}

async function page({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  const { id: teamId } = await params;
  const team = await prisma.team.findUnique({
    where: { id: teamId, memberships: { some: { userId: session.user.id } } },
    include: {
      memberships: {
        where: {
          userId: session.user.id,
        },
        select: { id: true, role: true },
        take: 1,
      },
    },
  });
  if (!team) {
    redirect("/teams");
  }

  const memberships = await prisma.membership.findMany({
    where: { teamId },
    select: { id: true, role: true },
  });
  const { id: currentMembershipId, role: userRole } = team.memberships[0];
  const membersAvatars = prisma.membership.findMany({
    where: { teamId },
    select: {
      user: {
        select: {
          id: true,
          image: true,
        },
      },
    },
    take: 8,
  });

  const assignmentsPromise = new Promise<NormalizedAssignment[]>(
    async (resolve) => {
      const assignments = await prisma.assignment.findMany({
        where: { teamId },
        orderBy: { task: { createdAt: "desc" } },
        distinct: ["taskId"],
        include: {
          task: {
            select: {
              title: true,
              description: true,
              createdAt: true,
              assignments: {
                select: {
                  isDone: true,
                },
              },
            },
          },
        },
      });

      resolve(assignments.map(({ task, ...ass }) => ({ ...ass, ...task })));
    },
  );

  return (
    <div className="grid grid-cols-1 content-start rounded-t-xl gap-3 h-full scrollbar-hide overflow-auto lg:overflow-hidden lg:grid-rows-[auto_1fr] lg:grid-cols-2 xl:grid-cols-3">
      <Header
        title={team.name}
        // headerMenuProps={{
        //   page: "TEAM",
        //   onTeamDelete: () => alert("123"),
        //   onTeamEdit: () => alert("...."),
        // }}
      />
      <Suspense>
        <TeamInfo
          teamId={teamId}
          role={userRole}
          membersCount={memberships.length}
          description={team.description}
          avatarsPromise={membersAvatars}
        />
      </Suspense>
      <Suspense>
        <TeamTasks
          teamId={teamId}
          role={userRole}
          currentMembershipId={currentMembershipId}
          membershipsIds={memberships
            .filter((member) => member.role === "MEMBER")
            .map((member) => member.id)}
          assignmentsPromise={assignmentsPromise}
        />
      </Suspense>
    </div>
  );
}

export default page;
