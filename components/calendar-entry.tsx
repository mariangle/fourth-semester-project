import type { Entry } from "@prisma/client";
import { formatDurationFromMinutes } from "@/lib/utils";
import { format, isSameDay, isToday } from "date-fns";
import { Home, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInterface } from "@/hooks/use-interface";
import { useView } from "@/hooks/use-view";
import { useEntry } from "@/hooks/use-entry";

interface CalendarEntry {
  day: Date;
  entries: Entry[];
}

export function CalendarEntry({ day, entries }: CalendarEntry) {
  const { setOpen } = useInterface();
  const { setDate } = useView();
  const { setEntry } = useEntry();
  const isCurrentDay = isToday(day);

  // Find entries with same day
  const entriesForDay = entries.filter((entry) =>
    isSameDay(new Date(entry.date), day)
  );

  const hasNoEntry = entriesForDay.length === 0;
  const hasEntry = entriesForDay.length > 0;

  return (
    <div
      className={cn(
        "col-span-1 p-4 border-b border-r relative h-16 group cursor-pointer border-l-2 border-l-transparent text-center font-semibold",
        hasEntry && "bg-blue-500/10 border-l-blue-500"
      )}
      key={day.toString()}
      onClick={() => {
        setOpen(true);
        if (hasNoEntry) {
          setDate(day);
        } else {
          setEntry(entries[0]);
        }
      }}
    >
      <span
        className={cn(
          "absolute top-1 left-1 p-1.5 text-xs rounded-full font-medium",
          isCurrentDay && "bg-blue-600 text-white"
        )}
      >
        {format(day, "d")}
      </span>
      {hasEntry && (
        <span className="absolute top-1 right-1 p-1.5">
          {entriesForDay[0].remote ? (
            <Home className="w-3 h-3 text-blue-500" />
          ) : (
            <Briefcase className="w-3 h-3 text-blue-500" />
          )}
        </span>
      )}
      {entriesForDay.map((entry) => (
        <div key={entry.id}>
          {formatDurationFromMinutes(entry.timeInMinutes)}
        </div>
      ))}
    </div>
  );
}
