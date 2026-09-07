"use client";

import { useState } from "react";
import Subheading from "./Subheading";
import Task from "./Task";
import Prisma from "@prisma/client";

interface Props {
  tasks: Prisma.Task[];
}

function MyTasks({ tasks = [] }: Props) {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const completedTasks = tasks.filter((t) => t.isDone);
  const uncompletedTasks = tasks.filter((t) => !t.isDone);
  return (
    <div className="">
      <Subheading>My Tasks</Subheading>
      <div className="mt-2">
        {uncompletedTasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            editTaskId={editTaskId}
            setEditing={(editing) => setEditTaskId(editing ? task.id : null)}
          />
        ))}
      </div>
      {completedTasks.length > 0 && (
        <div className="">
          <p className="text-sm text-center text-slate-400 my-2 relative before:absolute before:top-1/2 before:left-[50%] before:-translate-x-27 before:translate-y-[-50%] before:h-px before:w-10 before:bg-slate-400 after:absolute after:top-1/2 after:left-[50%] after:translate-x-17 after:translate-y-[-50%] after:h-px after:w-10 after:bg-slate-400">
            Completed Tasks
          </p>
          <div className="">
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                {...task}
                editTaskId={editTaskId}
                setEditing={(editing) =>
                  setEditTaskId(editing ? task.id : null)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTasks;
