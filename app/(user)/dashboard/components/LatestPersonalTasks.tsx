"use client";

import Subheading from "@/components/Subheading";
import { PrismaPromise } from "@prisma/client";
import React, { use } from "react";
import MiniTask from "./MiniTask";

type Props = {
  tasksPromise: PrismaPromise<
    {
      id: string;
      title: string;
      isDone: boolean;
      createdAt: Date;
    }[]
  >;
};

function LatestPersonalTasks({ tasksPromise }: Props) {
  const tasks = use(tasksPromise);
  return (
    <div className="">
      <h3 className="mb-1 font-medium">Perosnal</h3>
      {tasks.length > 0 ? (
        <>
          {tasks.map((t) => (
            <MiniTask {...t} key={t.id} />
          ))}
        </>
      ) : (
        <p className="text-sm text-center text-slate-400 p-5">
          No incompleted personal tasks,
          <br />
          go and create some more
        </p>
      )}
    </div>
  );
}

export default LatestPersonalTasks;
