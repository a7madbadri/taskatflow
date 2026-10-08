"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Overlay from "@/components/Overlay";
import Tip from "@/components/Tip";
import { createTeamAction } from "@/lib/actions/team.actions";
import { CreateTeamInput, createTeamSchema } from "@/schemas/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";

interface Props {
  visible: boolean;
  close: () => void;
}

export default function AddTeamModal({ visible, close }: Props) {
  const {
    control,
    watch,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { execute, status } = useAction(createTeamAction, {
    onSuccess({ data }) {
      if (data.success) {
        reset();
        close();
      }
    },
  });
  const isPending = status === "executing";

  const onSubmit = (data: CreateTeamInput) => {
    execute(data);
  };
  return (
    <>
      <AnimatePresence>
        {visible && (
          <div className="fixed top-20 left-1/2 translate-x-[-50%] bg-white z-20 max-w-[calc(100%-32px)] w-90 rounded-2xl p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Create Team</h3>
              <button
                className="bg-slate-200 size-7 rounded-full grid place-items-center duration-150 hover:scale-96"
                onClick={close}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label>Team name</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      value={watch("name")}
                      setValue={(value) => field.onChange(value)}
                      placeholder="What is this team called"
                      onBlur={field.onBlur}
                      disabled={isPending}
                    />
                  )}
                />
              </div>
              <div className="">
                <label>Description</label>
                <textarea
                  className="block border border-slate-300 rounded-[20px] w-full text-sm p-2 disabled:opacity-50 disabled:pointer-events-none"
                  rows={4}
                  placeholder="Describe your team, it's useful for your members"
                  {...register("description")}
                  disabled={isPending}
                ></textarea>
              </div>
              {(errors.name?.message || errors.description?.message) && (
                <Tip type={"error"}>
                  {errors.name?.message || errors.description?.message || ""}
                </Tip>
              )}
              <Button
                size="medium"
                className="w-full mt-4"
                theme="primary"
                disabled={isPending}
              >
                Create Team
              </Button>
            </form>
          </div>
        )}
      </AnimatePresence>
      <Overlay visible={visible} z={15} />
    </>
  );
}
