"use client";

import Button from "@/components/Button";
import AssignmentMenu from "../components/AssignmentMenu";
import {
  deleteTeamTaskAction,
  toggleAssignmentStatusAction,
} from "@/lib/actions/team.actions";
import { NormalizedAssignment } from "@/types/team";
import { foramtDate } from "@/utils";
import { Role } from "@prisma/client";
import { CheckCircle, Circle, Loader, MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import CreateEditTeamTask from "./CreateEditTeamTask";

interface Props {
  assignment: NormalizedAssignment;
  role: Role;
  teamId: string;
  currentMembershipId: string;
}

function Assignment({
  assignment: {
    id,
    title,
    description,
    isDone,
    createdAt,
    taskId,
    assignments: allAssignments,
  },
  role,
  teamId,
  currentMembershipId,
}: Props) {
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const doneAssignmentsCount = allAssignments.filter((as) => as.isDone).length;
  const { execute: toggleExecute, status: toggleStatus } = useAction(
    toggleAssignmentStatusAction,
    {
      onSuccess({ data }) {
        if (data.success) {
          console.log("Succeded");
        } else {
          console.error(data.message);
        }
      },
    },
  );
  const { execute: deleteExecute, status: deleteStatus } =
    useAction(deleteTeamTaskAction);
  const isTogglePending = toggleStatus === "executing";
  const isDeletePending = deleteStatus === "executing";
  return (
    <>
      <div
        className={`bg-slate-50 border border-slate-200 p-2 rounded-xl not-last:mb-2 ${isDeletePending ? "is-disable" : ""}`}
      >
        <div
          className={`flex gap-2 mb-1 cursor-pointer w-full items-center ${isTogglePending ? "is-disable" : ""}`}
        >
          {role !== "OWNER" && (
            <button
              className=""
              onClick={() =>
                toggleExecute({ id, teamId, membershipId: currentMembershipId })
              }
            >
              {isTogglePending ? (
                <Loader size={18} className="animate-spin" />
              ) : isDone ? (
                <CheckCircle size={18} />
              ) : (
                <Circle size={18} />
              )}
            </button>
          )}
          <p className="text-sm font-medium flex-1">{title}</p>
          {role === "OWNER" && (
            <AssignmentMenu
              onEdit={() => setEditTaskModalVisible(true)}
              onDelete={() => deleteExecute({ teamId, taskId })}
            />
          )}
        </div>
        <p className="text-sm text-slate-600 mb-2">{description}</p>
        <div className="w-full h-2 rounded-full bg-indigo-200 mb-1">
          <div
            className="h-full rounded-full bg-indigo-600 duration-150"
            style={{
              width: `${(doneAssignmentsCount * 100) / allAssignments.length}%`,
            }}
          />
        </div>

        {/* <div className="">
        <p className="text-xs text-slate-500">
          Done By <i>ahmedali</i> and 16 others
        </p>
      </div> */}
        {/* <hr className="border-slate-300 my-2" />
      <div className="flex">
        <p className="text-sm">{foramtDate(createdAt)}</p>
        <div className="">
          <Button theme="default2">Edit</Button>
        </div>
      </div> */}
      </div>
      <CreateEditTeamTask
        visible={editTaskModalVisible}
        close={() => setEditTaskModalVisible(false)}
        teamId={teamId}
        membershipsIds={[]}
        edit={true}
        originalData={{
          title,
          description,
          taskId,
          membershipId: currentMembershipId,
        }}
      />
    </>
  );
}

export default Assignment;
