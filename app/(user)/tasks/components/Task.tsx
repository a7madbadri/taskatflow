"use client";

import { CheckCircle, Circle, Edit, Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import {
  deleteTaskAction,
  toggleTaskStatusAction,
} from "@/lib/actions/task.actions";
import EditTask from "./EditTask";
import TaskMenu from "./TaskMenu";
import { foramtDate } from "@/utils";

interface Props {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  editTaskId: string | null;
  setEditing: (editing: boolean) => void;
}

function Task({
  id,
  title,
  description,
  isDone,
  createdAt,
  editTaskId,
  setEditing,
}: Props) {
  const editingMe = editTaskId === id ? true : false;
  const editing = editTaskId ? true : false;

  const { execute: toggleExecute, status: toggleStatus } = useAction(
    toggleTaskStatusAction,
  );
  const { execute: deleteExecute, status: deleteStatus } =
    useAction(deleteTaskAction);
  const isTogglePending = toggleStatus === "executing";
  const isDeletePending = deleteStatus === "executing";
  return (
    <div
      className={`bg-slate-50 border border-slate-200 p-2 rounded-xl not-last:mb-2 ${editing && !editingMe ? "opacity-50 pointer-events-none" : ""}`}
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
            className={`flex gap-2 mb-1 cursor-pointer w-full items-center ${isTogglePending ? "opacity-50 pointer-events-none" : isDone ? "opacity-50" : ""}`}
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
            <p
              className={`text-sm font-medium flex-1 ${isDone ? "line-through" : ""}`}
            >
              {title}
            </p>
            <TaskMenu
              onEdit={() => setEditing(true)}
              onDelete={() => deleteExecute({ id })}
            />
          </div>
          <p className="text-sm text-slate-600">{description}</p>
          <hr className="w-full  border-slate-200 my-2" />
          <div className="">
            <p className="text-sm text-slate-500">{foramtDate(createdAt)}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
