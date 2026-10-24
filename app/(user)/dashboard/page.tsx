import { auth } from "@/auth";
import Subheading from "@/components/Subheading";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LatestPersonalTasks from "./components/LatestPersonalTasks";
import LatestTeamsTasks from "./components/LatestTeamsTasks";

async function page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  const personalTasks = await (async () => {
    const tasks = await prisma.task.findMany({
      where: { userId: session.user.id },
      select: { isDone: true },
    });
    const total = tasks.length;
    const completed = tasks.filter((t) => t.isDone).length;

    return { total, completed };
  })();
  const teamsTasks = await (async () => {
    const userMemberships = await prisma.membership.findMany({
      where: { userId: session.user.id },
      select: {
        assignments: {
          select: {
            isDone: true,
          },
        },
      },
    });
    let total = 0;
    let completed = 0;
    userMemberships.forEach((team) => {
      total += team.assignments.length;
      team.assignments.forEach((as) => {
        if (as.isDone) completed++;
      });
    });
    return { total, completed };
  })();

  const latestPersonalTasksPromise = prisma.task.findMany({
    where: { userId: session.user.id, isDone: false },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      isDone: true,
      createdAt: true,
    },
  });
  const latestTeamsTasksPromise = prisma.assignment.findMany({
    where: {
      isDone: false,
      membership: {
        is: {
          userId: session.user.id,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      isDone: true,
      createdAt: true,
      task: {
        select: {
          title: true,
        },
      },
      team: {
        select: {
          id: true,
          name: true,
        },
      },
      membership: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <>
      <div className="main-card p-3 @container mb-4">
        <div className="mb-4">
          <Subheading>Dashboard</Subheading>
        </div>
        <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-2 gap-3">
          <div className="bg-indigo-600 rounded-lg p-2">
            <p className="text-s mb-1 text-white font-medium">Personal Tasks</p>
            <div className="text-sm text-slate-200 flex gap-3 items-end mb-1">
              <p className="">
                <span className="text-2xl text-white font-medium">
                  {personalTasks.total}
                </span>{" "}
                Total
              </p>
              <p className="">
                <span className="text-white font-medium">
                  {personalTasks.completed}
                </span>{" "}
                Completed
              </p>
            </div>
          </div>
          <div className="rounded-lg p-2 shadow-[0_0_20px_-3px_#00000022] border border-slate-200">
            <p className="text-s mb-1 font-medium">Teams&apos; Tasks</p>
            <div className="text-sm text-slate-500 flex gap-3 items-end mb-1">
              <p className="">
                <span className="text-2xl text-slate-900 font-medium">
                  {teamsTasks.total}
                </span>{" "}
                Total
              </p>
              {teamsTasks.total > 0 && (
                <p className="">
                  <span className="text-slate-900 font-medium">
                    {teamsTasks.completed}
                  </span>{" "}
                  Completed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="main-card p-3">
        <Subheading className="mb-2">Latest Incompleted Tasks</Subheading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <LatestPersonalTasks tasksPromise={latestPersonalTasksPromise} />
          <LatestTeamsTasks tasksPromise={latestTeamsTasksPromise} />
        </div>
      </div>
    </>
  );
}

export default page;
