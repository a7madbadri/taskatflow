"use client";

import Subheading from "@/components/Subheading";
import React, { use, useState } from "react";
import Assignment from "./Assignment";
import Button from "@/components/Button";
import { X } from "lucide-react";
import Overlay from "@/components/Overlay";
import InputField from "@/components/InputField";
import { Controller, useForm } from "react-hook-form";
import { CreateTeamTaskInput, createTeamTaskSchema } from "@/schemas/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createTeamTaskAction } from "@/lib/actions/team.actions";
import { AnimatePresence } from "framer-motion";
import Tip from "@/components/Tip";
import { PrismaPromise, Role } from "@prisma/client";
import { NormalizedAssignment } from "@/types/team";
import CreateEditTeamTask from "./CreateEditTeamTask";

interface Props {
  teamId: string;
  role: Role;
  currentMembershipId: string;
  membershipsIds: string[];
  assignmentsPromise: Promise<NormalizedAssignment[]>;
}

export default function TeamTasks({
  teamId,
  role,
  currentMembershipId,
  membershipsIds,
  assignmentsPromise,
}: Props) {
  const assignments = use(assignmentsPromise);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  return (
    <>
      <div className="main-card p-3 scrollbar-hide lg:overflow-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 xl:col-span-2 xl:col-start-2">
        <div className="flex items-center justify-between mb-3">
          <Subheading>Team&apos;s Tasks</Subheading>
          {role === "OWNER" && (
            <Button
              theme="primary"
              onClick={() => setAddTaskModalVisible(true)}
            >
              Add Task
            </Button>
          )}
        </div>
        {assignments.length > 0 ? (
          <div className="mt-2">
            {assignments.map((task) => {
              return (
                <Assignment
                  key={task.id}
                  assignment={task}
                  role={role}
                  teamId={teamId}
                  currentMembershipId={currentMembershipId}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-600 text-center italic">
            No tasks for now ~_~
          </p>
        )}
      </div>
      <CreateEditTeamTask
        visible={addTaskModalVisible}
        close={() => setAddTaskModalVisible(false)}
        teamId={teamId}
        membershipsIds={membershipsIds}
      />
    </>
  );
}
