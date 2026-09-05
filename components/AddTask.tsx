"use client";

import { useState } from "react";
import InputField from "./InputField";
import Subheading from "./Subheading";
import Button from "./Button";

function AddTask() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  return (
    <div className="mb-4">
      <Subheading>Add Task</Subheading>
      <form className="mt-2 bg-slate-200 rounded-2xl px-3 py-4">
        <div className="mb-3 sm:flex sm:items-center">
          <label className="block w-30 mb-1 sm:m-0">Title</label>
          <InputField
            value={taskData.title}
            theme="medium"
            setValue={(value) => setTaskData({ ...taskData, title: value })}
            placeholder="What are you planning to do ?"
            className="flex-1"
          />
        </div>
        <div className="mb-3 sm:flex sm:items-center">
          <label className="block w-30">Desccription</label>
          <InputField
            value={taskData.description}
            setValue={(value) =>
              setTaskData({ ...taskData, description: value })
            }
            theme="medium"
            placeholder="Describe it,"
            className="flex-1"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button size="medium" className="" type="button">
            Clear
          </Button>
          <Button size="medium" theme="primary" className="">
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
