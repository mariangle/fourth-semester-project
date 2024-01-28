"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Entry } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDurationFromMinutes } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "./data-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Entry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as string;

      return <div className="font-medium">{format(date, "dd MM yyyy")}</div>;
    },
  },
  {
    accessorKey: "timeInMinutes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hours" />
    ),
    cell: ({ row }) => {
      const timeInMinutes = row.getValue("timeInMinutes") as number;
      const remote = row.original.remote;

      return (
        <div className="font-medium">
          {formatDurationFromMinutes(timeInMinutes)}
          {remote && (
            <Badge className="ml-2" variant="secondary">
              Remote
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => {
      return (
        <Badge
          className="ml-2"
          variant={row.original.paid ? "success" : "destructive"}
        >
          {row.original.paid ? "paid" : "not paid"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
