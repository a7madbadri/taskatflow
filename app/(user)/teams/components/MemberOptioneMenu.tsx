"use client";

import { MoreVertical, CircleSlash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MemberOptionsMenuProps = {
  onRemove: () => void;
};

export default function MemberOptionsMenu({
  onRemove,
}: MemberOptionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-7 grid place-items-center rounded-sm duration-150 hover:bg-slate-200">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={onRemove}
          className="text-destructive focus:text-destructive"
        >
          <CircleSlash className="text-inherit" />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
