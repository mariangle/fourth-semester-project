"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInterface } from "@/hooks/use-interface";

export function CreateButton() {
  const { setOpen } = useInterface();

  return (
    <Button
      variant="theme"
      className="justify-start w-full"
      onClick={() => setOpen(true)}
    >
      <Plus className="w-4 h-4 mr-2" />
      Create entry
    </Button>
  );
}
