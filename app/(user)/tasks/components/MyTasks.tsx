"use client";

import { useState } from "react";
import Subheading from "@/components/Subheading";
import Task from "./Task";
import Prisma from "@prisma/client";
import Link from "next/link";

interface Props {
  tasks: Prisma.Task[];
  filter?: TaskFilters;
}

function MyTasks({ tasks = [], filter }: Props) {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const completedTasks = tasks.filter((t) => t.isDone);
  const uncompletedTasks = tasks.filter((t) => !t.isDone);

  return (
    <div className="main-card p-3 flex-1">
      <div className="flex items-center justify-between">
        <Subheading>My Tasks</Subheading>
        <div className="text-sm h-full flex text-slate-600">
          <Link
            href="/tasks"
            className={`border border-slate-300 px-2 py-0.5 h-full rounded-l-md ${!filter || filter === "all" ? "text-indigo-600 bg-indigo-100 font-medium" : "hover:bg-slate-100"}`}
          >
            All
          </Link>
          <Link
            href="/tasks?filter=active"
            className={`border border-slate-300 px-2 py-0.5 h-full ${filter === "active" ? "text-indigo-600 bg-indigo-100 font-medium" : "hover:bg-slate-100"}`}
          >
            Done
          </Link>
          <Link
            href="/tasks?filter=completed"
            className={`border border-slate-300 px-2 py-0.5 h-full rounded-r-md ${filter === "completed" ? "text-indigo-600 bg-indigo-100 font-medium" : "hover:bg-slate-100"}`}
          >
            Incompleted
          </Link>
        </div>
      </div>
      {tasks.length === 0 && (
        <div className="size-full flex items-center justify-center text-center text-sm text-slate-500">
          <p>
            You&apos;ve no any tasks
            <br />
            Add some tasks up there
          </p>
        </div>
      )}
      <div className="mt-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            editTaskId={editTaskId}
            setEditing={(editing) => setEditTaskId(editing ? task.id : null)}
          />
        ))}
      </div>
    </div>
  );
}

export default MyTasks;
