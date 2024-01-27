"use client";

import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Entry } from "@prisma/client";
import { deleteEntry } from "@/actions/delete-entry";
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";

interface EntryActionsProps {
  entry: Entry;
}
export function EntryActions({ entry }: EntryActionsProps) {
  const router = useRouter();
  const { execute, isLoading } = useAction(deleteEntry, {
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-6 w-6 p-0">
          <MoreHorizontal className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push(`/entries/${entry.id}`);
          }}
        >
          Details
        </DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            execute(entry.id);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
