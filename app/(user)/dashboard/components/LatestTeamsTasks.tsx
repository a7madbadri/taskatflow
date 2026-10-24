"use client";

import { PrismaPromise } from "@prisma/client";
import React, { use } from "react";
import MiniTask from "./MiniTask";

type Props = {
  tasksPromise: PrismaPromise<
    {
      task: {
        title: string;
      };
      id: string;
      isDone: boolean;
      createdAt: Date;
      team: {
        id: string;
        name: string;
      };
      membership: { id: string };
    }[]
  >;
};

function LatestTeamsTasks({ tasksPromise }: Props) {
  const tasks = use(tasksPromise);
  return (
    <div className="">
      <h3 className="mb-1 font-medium">Teams</h3>
      {tasks.length > 0 ? (
        <>
          {tasks.map((t) => (
            <MiniTask
              {...t}
              title={t.task.title}
              membershipId={t.membership.id}
              key={t.id}
            />
          ))}
        </>
      ) : (
        <p className="text-sm text-center text-slate-400 p-5">
          You&apos;ve done yours with the teams,
          <br />
          good job, keep it that way
        </p>
      )}
    </div>
  );
}

export default LatestTeamsTasks;
