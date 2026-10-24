import { MoreHorizontal, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

export type HeaderMenuProps =
  | {
      page: "TEAM";
      // role: "OWNER";
      onTeamEdit: () => void;
      onTeamDelete: () => void;
    }
  | {
      page: "DASHBOARD";
      onTeamEditqq: () => void;
    };

function HeaderMenu({ ...props }: HeaderMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Task options"
          className="size-8 grid place-items-center rounded-sm duration-150 hover:bg-slate-200"
        >
          <MoreVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      {props.page === "TEAM" ? (
        <TeamOwnerMenuOptions
          onTeamDelete={props.onTeamDelete}
          onTeamEdit={props.onTeamEdit}
        />
      ) : (
        ""
      )}
    </DropdownMenu>
  );
}

const TeamOwnerMenuOptions = ({
  onTeamEdit,
  onTeamDelete,
}: {
  onTeamEdit: () => void;
  onTeamDelete: () => void;
}) => {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onSelect={onTeamEdit}>Edit team</DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onSelect={onTeamDelete}
        className="text-destructive focus:text-destructive"
      >
        Delete team
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default HeaderMenu;
