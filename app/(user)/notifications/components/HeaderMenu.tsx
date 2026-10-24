"use client";

import { Trash2, CheckCheck, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderMenuProps = {
  onMarkAllAsRead?: () => void;
  onDeleteAll: () => void;
};

export default function HeaderMenu({
  onMarkAllAsRead,
  onDeleteAll,
}: HeaderMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="size-7 grid place-items-center rounded-sm duration-150 hover:bg-slate-200">
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-fit">
          {onMarkAllAsRead && (
            <>
              <DropdownMenuItem
                className="text-nowrap"
                onSelect={onMarkAllAsRead}
              >
                <CheckCheck />
                Mark all as read
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={onDeleteAll}
          >
            <Trash2 />
            Delete all
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
