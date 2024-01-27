"use client";

import { useView } from "@/hooks/use-view";
import { ViewNavigation } from "@/components/view-navigation";

interface ViewWrapperProps {
  table: React.ReactNode;
  calendar: React.ReactNode;
}

export function ViewWrapper({ table, calendar }: ViewWrapperProps) {
  const { view } = useView();

  return (
    <div>
      <ViewNavigation />
      {view === "table" && table}
      {view === "calendar" && calendar}
    </div>
  );
}
