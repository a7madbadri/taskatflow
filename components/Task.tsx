"use client";

import { CheckCircle, Circle, Edit, Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

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
  isDone: done,
  editTaskId,
  setEditing,
}: Props) {
  const [isDone, setIsDone] = useState(done);
  const editingMe = editTaskId === id ? true : false;
  const editing = editTaskId ? true : false;
  const [editingTaskData, setEditingTaskData] = useState({
    title: title,
    description: description,
  });
  return (
    <div
      className={`bg-indigo-100 border border-indigo-200 p-2 rounded-xl not-last:mb-2 ${editing && !editingMe ? "opacity-50 pointer-events-none" : ""}`}
    >
      {editing && editingMe ? (
        <>
          <form className="">
            <div className="mb-3 sm:flex sm:items-center">
              <label className="block w-30 mb-1 sm:m-0">Title</label>
              <InputField
                value={editingTaskData.title}
                theme="medium"
                setValue={(value) =>
                  setEditingTaskData({ ...editingTaskData, title: value })
                }
                placeholder="What are you planning to do ?"
                className="flex-1"
              />
            </div>
            <div className="mb-3 sm:flex sm:items-center">
              <label className="block w-30">Desccription</label>
              <InputField
                value={editingTaskData.description}
                setValue={(value) =>
                  setEditingTaskData({ ...editingTaskData, description: value })
                }
                theme="medium"
                placeholder="Describe it,"
                className="flex-1"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                size="medium"
                className=""
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button size="medium" theme="primary" className="">
                Update
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex gap-2 mb-1 cursor-pointer w-fit">
            <button className="" onClick={() => setIsDone(!isDone)}>
              {isDone ? <CheckCircle size={18} /> : <Circle size={18} />}
              {/* <Loader size={18} className="animate-spin" /> */}
            </button>
            <p className="">{title}</p>
          </div>
          <p className="text-sm text-slate-600">{description}</p>
          <hr className="w-full max-w-40 border-indigo-300 my-2" />
          <div className="flex justify- gap-2">
            <button
              className="size-8 grid place-items-center bg-slate-300 rounded-sm duration-150 hover:bg-slate-400 hover:scale-95"
              onClick={() => setEditing(true)}
            >
              <Edit size={18} />
            </button>
            <button className="size-8 grid place-items-center bg-red-300 text-red-700 rounded-sm duration-150 hover:bg-red-400 hover:scale-95">
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
