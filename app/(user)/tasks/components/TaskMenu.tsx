"use client";

import { Pencil, Trash2, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog } from "@/components/AlertDialog";
import { useState } from "react";

type TaskMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskMenu({ onEdit, onDelete }: TaskMenuProps) {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Task options"
            className="rounded-md p-2 duration-150 hover:bg-slate-200"
          >
            <MoreHorizontal size={20} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => setIsDeleteAlertOpen(true)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        onConfirm={onDelete}
        open={isDeleteAlertOpen}
        setOpen={setIsDeleteAlertOpen}
      />
    </>
  );
}
