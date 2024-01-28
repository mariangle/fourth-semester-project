"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement> & {}) {
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  React.useEffect(() => {
    if (date) {
      const searchParams = new URLSearchParams();
      if (date.from) {
        searchParams.set("from", format(date.from, "yyyy-MM-dd"));
      }
      if (date.to) {
        searchParams.set("to", format(date.to, "yyyy-MM-dd"));
      }
      router.push(`?${searchParams.toString()}`);
    }
  }, [date, router]);

  return (
    <div className="flex items-start gap-4">
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "md:w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() =>
            setDate({
              from: startOfMonth(new Date()),
              to: endOfMonth(new Date()),
            })
          }
        >
          {format(new Date(), "MMMM")}
        </Button>
      </div>
    </div>
  );
}
