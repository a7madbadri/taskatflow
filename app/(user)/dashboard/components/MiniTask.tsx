import { toggleTaskStatusAction } from "@/lib/actions/task.actions";
import { toggleAssignmentStatusAction } from "@/lib/actions/team.actions";
import { foramtDate } from "@/utils";
import { CheckCircle, Circle, Loader, Users2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import React from "react";

function MiniTask({
  id,
  title,
  isDone,
  createdAt,
  team,
  membershipId,
}: {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  team?: {
    id: string;
    name: string;
  };
  membershipId?: string;
}) {
  const isAssignment =
    team !== undefined && team.id !== undefined && membershipId !== undefined;
  const { execute: taskToggleExecute, status: taskToggleStatus } = useAction(
    toggleTaskStatusAction,
  );
  const { execute: assignmentToggleExecute, status: assignmentToggleStatus } =
    useAction(toggleAssignmentStatusAction, {
      onSuccess({ data }) {
        if (data.success) {
          console.log("Succeded");
        } else {
          console.error(data.message);
        }
      },
    });
  const isTaskTogglePending = taskToggleStatus === "executing";
  const isAssignmentTogglePending = assignmentToggleStatus === "executing";

  return (
    <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl not-last:mb-2">
      <div className="flex gap-2">
        <button
          className="h-8 flex items-center"
          onClick={() =>
            isAssignment
              ? assignmentToggleExecute({ id, membershipId, teamId: team.id })
              : taskToggleExecute({ id })
          }
        >
          {isTaskTogglePending ||
          (isAssignment && isAssignmentTogglePending) ? (
            <Loader size={16} className="animate-spin" />
          ) : isDone ? (
            <CheckCircle size={16} />
          ) : (
            <Circle size={16} />
          )}
        </button>
        <p
          className={`text-sm flex-1 min-h-8 flex items-center ${isDone ? "line-through" : ""}`}
        >
          {title}
        </p>
      </div>
      <div className="flex gap-3 text-indigo-500">
        {isAssignment && (
          <Link href={`/teams/${team.id}`} className="text-xs flex gap-1">
            <Users2 size={14} /> {team.name}
          </Link>
        )}
        <span className="text-xs text-slate-500">{foramtDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default MiniTask;
