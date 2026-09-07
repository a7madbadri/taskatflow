import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTaskInput, editTaskSchema } from "@/schemas/task";
import { useAction } from "next-safe-action/hooks";
import { editTaskAction } from "@/lib/actions/task.actions";

interface Props {
  id: string;
  title: string;
  description: string;
  setEditing: (editing: boolean) => void;
}

function EditTask({ id, title, description, setEditing }: Props) {
  const {
    watch,
    handleSubmit,
    control,
    formState: { isValid, isDirty, errors },
  } = useForm<EditTaskInput>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      id,
      title,
      description,
    },
  });
  const { execute, status } = useAction(editTaskAction, {
    onSuccess({ data }) {
      if (data.success) {
        setEditing(false);
      }
    },
  });
  const isPending = status === "executing";

  const onSubmit = (data: EditTaskInput) => {
    execute(data);
  };
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 sm:flex sm:items-center">
        <label className="block w-30 mb-1 sm:m-0">Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <InputField
              value={watch("title")}
              theme="medium"
              setValue={(value: string) => field.onChange(value)}
              placeholder="What are you planning to do ?"
              className="flex-1"
              onBlur={field.onBlur}
              disabled={isPending}
            />
          )}
        />
      </div>
      <div className="mb-3 sm:flex sm:items-center">
        <label className="block w-30">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <InputField
              value={watch("description")}
              setValue={(value) => field.onChange(value)}
              theme="medium"
              placeholder="Describe it,"
              className="flex-1"
              onBlur={field.onBlur}
              disabled={isPending}
            />
          )}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button size="medium" className="" onClick={() => setEditing(false)}>
          Cancel
        </Button>
        <Button
          size="medium"
          theme="primary"
          className=""
          disabled={!isDirty || !isValid || isPending}
        >
          Update
        </Button>
      </div>
    </form>
  );
}

export default EditTask;
