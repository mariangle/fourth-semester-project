"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
