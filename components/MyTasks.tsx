"use client";

import { useState } from "react";
import Subheading from "./Subheading";
import Task from "./Task";

const dummyTasks = [
  { id: "01", title: "Task No 1", description: "Dummy Desc", isDone: false },
  { id: "02", title: "Task No 2", description: "Dummy Desc", isDone: false },
  { id: "03", title: "Task No 3", description: "Dummy Desc", isDone: false },
  { id: "04", title: "Task No 4", description: "Dummy Desc", isDone: false },
  { id: "05", title: "Task No 5", description: "Dummy Desc", isDone: false },
  { id: "06", title: "Task No 6", description: "Dummy Desc", isDone: false },
];

function MyTasks() {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  // const completedTasks = dummyTasks.filter((t) => t.isDone);
  // const uncompletedTasks = dummyTasks.filter((t) => !t.isDone);
  return (
    <div className="">
      <Subheading>My Tasks</Subheading>
      <div className="mt-2">
        {dummyTasks.map((task) => (
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
