"use client";

import { Trash2, MoreHorizontal, CheckCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotificationMenuProps = {
  onMarkAsRead?: () => void;
  onDelete: () => void;
};

export default function NotificationMenu({
  onMarkAsRead,
  onDelete,
}: NotificationMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="size-7 grid place-items-center rounded-sm duration-150 hover:bg-slate-200">
            <MoreHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-fit">
          {onMarkAsRead && (
            <>
              <DropdownMenuItem className="text-nowrap" onSelect={onMarkAsRead}>
                <CheckCheck />
                Mark as read
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={onDelete}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
