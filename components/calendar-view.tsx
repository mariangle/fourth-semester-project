"use client";
import React from "react";
import type { Entry } from "@prisma/client";
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { useView } from "@/hooks/use-view";
import { CalendarEntry } from "@/components/calendar-entry";

interface CalendarViewProps {
  entries: Entry[];
}

export function CalendarView({ entries }: CalendarViewProps) {
  const { month: currentMonth } = useView();

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate the offset for the first day of the month
  const firstDayOffset = getDay(firstDayOfMonth);

  return (
    <div>
      <div className="grid grid-cols-7">
        {weekdays.map((day) => (
          <div
            className="col-span-1 p-4 bg-secondary text-sm border-r border-b font-semibold  "
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: firstDayOffset }).map((_, index) => (
          <div
            className="col-span-1 p-4 border-b border-r"
            key={`offset-${index}`}
          />
        ))}
        {daysInMonth.map((day) => (
          <CalendarEntry entries={entries} day={day} key={day.toString()} />
        ))}
      </div>
    </div>
  );
}
