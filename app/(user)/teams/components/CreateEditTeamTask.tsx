import InputField from "@/components/InputField";
import Tip from "@/components/Tip";
import { createEditTeamTaskAction } from "@/lib/actions/team.actions";
import {
  CreateEditTeamTaskInput,
  createEditTeamTaskSchema,
} from "@/schemas/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Overlay from "@/components/Overlay";
import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

const CreateEditTeamTask = ({
  visible,
  close,
  teamId,
  membershipsIds: membersIds,
  edit = false,
  originalData,
}: {
  visible: boolean;
  close: () => void;
  teamId: string;
  membershipsIds: string[];
  edit?: boolean;
  originalData?: {
    taskId: string;
    title: string;
    description: string;
    membershipId: string;
  };
}) => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateEditTeamTaskInput>({
    resolver: zodResolver(createEditTeamTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      teamId,
      membersIds,
      edit: edit,
    },
  });
  const { execute, status } = useAction(createEditTeamTaskAction, {
    onSuccess({ data }) {
      if (data.success) {
        close();
        reset();
      } else {
        console.error(data.message);
      }
    },
  });
  const isPending = status === "executing";
  const onSubmit = (data: CreateEditTeamTaskInput) => {
    execute(data);
  };

  useEffect(() => {
    if (edit && originalData) {
      reset({
        taskId: originalData.taskId,
        title: originalData.title,
        description: originalData.description,
        edit,
        teamId,
        membersIds: [],
      });
    }
  }, [edit, originalData, reset, teamId]);
  //TODO:: Add outside clicks handler to close modal

  return (
    <>
      <AnimatePresence>
        {visible && (
          <div className="fixed top-20 left-1/2 translate-x-[-50%] bg-white z-20 max-w-[calc(100%-32px)] w-90 rounded-2xl p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Add Team&apos;s Task</h3>
              <button
                className="bg-slate-200 size-7 rounded-full grid place-items-center duration-150 hover:scale-96"
                onClick={() => {
                  close();
                  reset();
                }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label>Title</label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      value={watch("title")}
                      setValue={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      placeholder="What are you planning to do ?"
                      disabled={isPending}
                    />
                  )}
                />
              </div>
              <div className="">
                <label>Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      value={watch("description")}
                      setValue={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      placeholder="Discribe it"
                      disabled={isPending}
                    />
                  )}
                />
              </div>
              {(errors.title?.message || errors.description?.message) && (
                <Tip type={"error"}>
                  {errors.title?.message || errors.description?.message || ""}
                </Tip>
              )}
              <Button
                size="medium"
                className="w-full mt-4"
                theme="primary"
                disabled={isPending || (edit && !isDirty)}
                type="submit"
              >
                {edit ? "Update" : "Create"} Task
              </Button>
            </form>
          </div>
        )}
      </AnimatePresence>
      <Overlay z={15} visible={visible} />
    </>
  );
};

export default CreateEditTeamTask;
