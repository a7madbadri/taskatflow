"use client";

import { CheckCircle, Circle, Edit, Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAction } from "next-safe-action/hooks";
import {
  deleteTaskAction,
  toggleTaskStatusAction,
} from "@/lib/actions/task.actions";
import EditTask from "./EditTask";

interface Props {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  editTaskId: string | null;
  setEditing: (editing: boolean) => void;
}

function Task({
  id,
  title,
  description,
  isDone,
  editTaskId,
  setEditing,
}: Props) {
  const editingMe = editTaskId === id ? true : false;
  const editing = editTaskId ? true : false;
  const [editingTaskData, setEditingTaskData] = useState({
    title: title,
    description: description,
  });

  const {
    execute: toggleExecute,
    status: toggleStatus,
    result: toggleResult,
  } = useAction(toggleTaskStatusAction);
  const {
    execute: deleteExecute,
    status: deleteStatus,
    result: deleteResult,
  } = useAction(deleteTaskAction);
  const isTogglePending = toggleStatus === "executing";
  const isDeletePending = deleteStatus === "executing";
  return (
    <div
      className={`bg-indigo-100 border border-indigo-200 p-2 rounded-xl not-last:mb-2 ${editing && !editingMe ? "opacity-50 pointer-events-none" : ""}`}
    >
      {editing && editingMe ? (
        <EditTask
          id={id}
          title={title}
          description={description}
          setEditing={setEditing}
        />
      ) : (
        <>
          <div
            className={`flex gap-2 mb-1 cursor-pointer w-fit ${isTogglePending ? "opacity-50 pointer-events-none" : isDone ? "opacity-50" : ""}`}
          >
            <button className="" onClick={() => toggleExecute({ id })}>
              {isTogglePending ? (
                <Loader size={18} className="animate-spin" />
              ) : isDone ? (
                <CheckCircle size={18} />
              ) : (
                <Circle size={18} />
              )}
            </button>
            <p className={isDone ? "line-through" : ""}>{title}</p>
          </div>
          <p className="text-sm text-slate-600">{description}</p>
          <hr className="w-full max-w-40 border-indigo-300 my-2" />
          <div className="flex justify- gap-2">
            {!isDone && (
              <button
                className="size-8 grid place-items-center bg-slate-300 rounded-sm duration-150 hover:bg-slate-400 hover:scale-95"
                onClick={() => setEditing(true)}
              >
                <Edit size={18} />
              </button>
            )}
            <button
              className="size-8 grid place-items-center bg-red-300 text-red-700 rounded-sm duration-150 hover:bg-red-400 hover:scale-95"
              onClick={() => deleteExecute({ id })}
              disabled={isDeletePending}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
