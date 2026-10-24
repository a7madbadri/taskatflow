"use client";

import InputField from "@/components/InputField";
import Subheading from "@/components/Subheading";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { CreateTaskInput, createTaskSchema } from "@/schemas/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createTaskAction } from "@/lib/actions/task.actions";
import Tip from "@/components/Tip";
import { toast } from "sonner";

function AddTask() {
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isValid, isDirty, errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { execute, status } = useAction(createTaskAction, {
    onSuccess({ data }) {
      if (data.success) {
        toast.success("Task created successfully");
        reset();
      } else {
        toast.error(data.message);
      }
    },
  });
  const isPending = status === "executing";

  const onSubmit = (data: CreateTaskInput) => {
    execute(data);
  };

  return (
    <div className="mb-4 main-card p-3">
      <Subheading>Add Task</Subheading>
      <form className="mt-2 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="sm:flex sm:items-center">
            <label className="block w-30 mb-1 sm:m-0">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputField
                  value={watch("title")}
                  theme="medium"
                  setValue={(value: string) => {
                    field.onChange(value);
                  }}
                  placeholder="What are you planning to do ?"
                  className="flex-1"
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
          {errors.title?.message && (
            <Tip type="error">{errors.title.message}</Tip>
          )}
        </div>
        <div className="mb-3">
          <div className="sm:flex sm:items-center">
            <label className="block w-30">Desccription</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <InputField
                  value={watch("description")}
                  theme="medium"
                  setValue={(value: string) => {
                    field.onChange(value);
                  }}
                  placeholder="Describe it :D"
                  className="flex-1"
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
          {errors.description?.message && (
            <Tip type="error">{errors.description.message}</Tip>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          {isDirty && (
            <Button
              size="medium"
              className=""
              type="button"
              onClick={() => reset()}
              disabled={isPending}
            >
              Clear
            </Button>
          )}
          <Button
            size="medium"
            theme="primary"
            type="submit"
            disabled={!isValid || isPending}
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
