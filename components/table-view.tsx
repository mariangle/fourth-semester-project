import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Entry } from "@prisma/client";
import { EntryActions } from "@/components/entry-actions";
import { formatDurationFromMinutes } from "@/lib/utils";

interface TableViewProps {
  entries: Entry[];
}

export function TableView({ entries }: TableViewProps) {
  const totalTimeInMinutes = entries.reduce(
    (sum, entry) => sum + entry.timeInMinutes,
    0
  );

  return (
    <Table>
      <TableHeader className="bg-secondary">
        <TableRow className="text-sm">
          <TableHead className="w-[150px]">Date</TableHead>
          <TableHead>Hours</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">
              {entry.date.toDateString()}
            </TableCell>
            <TableCell>
              {formatDurationFromMinutes(entry.timeInMinutes)}
              {JSON.stringify(entry.remote)}
            </TableCell>
            <TableCell>{entry.note}</TableCell>
            <TableCell className="text-right">
              <EntryActions entry={entry} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total Hours</TableCell>
          <TableCell colSpan={3}>
            {formatDurationFromMinutes(totalTimeInMinutes)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
