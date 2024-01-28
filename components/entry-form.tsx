"use client";

import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entryFormSchema, EntryFormValues } from "@/lib/validations";
import { useAction } from "@/hooks/use-action";
import { createEntry } from "@/actions/create-entry";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Entry } from "@prisma/client";
import { useView } from "@/hooks/use-view";
import { saveEntry } from "@/actions/save-entry";
import { deleteEntry } from "@/actions/delete-entry";

interface EntryFormProps {
  entry?: Entry | null;
  close?: () => void;
}

export function EntryForm({ close, entry }: EntryFormProps) {
  const [loading, setLoading] = React.useState(false);
  const { date } = useView();
  const { execute, isLoading } = useAction(createEntry, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (succes) => {
      console.log(succes);
    },
  });

  const defaultValues: Partial<EntryFormValues> = {
    time: "00:30",
    note: entry?.note || "",
    date: entry?.date || date,
    remote: entry?.remote || false,
  };

  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: EntryFormValues) => {
    setLoading(true);

    if (entry) {
      await saveEntry(entry.id, data);
    } else {
      await execute(data);
    }
    close && close();
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4"
      >
        <div className="flex items-end gap-4">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Hours <span className="text-blue-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your time" {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Date <span className="text-blue-700">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[180px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a note to this entry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remote"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <FormLabel>Remote</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-4">
          <div>
            {entry && (
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  await deleteEntry(entry.id);
                  close && close();
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => close && close()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" loading={loading}>
              {entry ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
