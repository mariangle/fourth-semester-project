import { EntryForm } from "@/components/entry-form";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEntry } from "@/hooks/use-entry";
import { useInterface } from "@/hooks/use-interface";
import { useView } from "@/hooks/use-view";

import React from "react";

export default function EntryDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useInterface();
  const { setDate } = useView();
  const { setEntry, entry } = useEntry();

  const onOpenChange = () => {
    if (open) {
      setDate(new Date());
      setEntry(null);
    }
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0">
        <EntryForm close={() => setOpen(false)} entry={entry} />
      </DialogContent>
    </Dialog>
  );
}
