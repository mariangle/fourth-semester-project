"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Logo } from "./ui/logo";
import React from "react";

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <AlignLeft className="w-4 h-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] space-y-6 p-4">
        <Logo />
        <Navigation close={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
