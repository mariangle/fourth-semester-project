import { db } from "@/lib/db";
import { PageHeading } from "@/components/ui/page";
import { startOfMonth, endOfMonth, parseISO } from "date-fns";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function UserEntries({
  params,
  searchParams,
}: {
  params: {
    userId: string;
  };
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const fromDate = searchParams.from
    ? parseISO(searchParams.from)
    : startOfMonth(new Date());
  const toDate = searchParams.to
    ? parseISO(searchParams.to)
    : endOfMonth(new Date());

  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  const entries = await db.entry.findMany({
    where: {
      userId: params.userId,
      date: {
        gte: fromDate,
        lte: toDate,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="space-y-4">
      <PageHeading
        title="Registrations"
        description={`${user?.name}'s registrations.`}
      />
      <DataTable columns={columns} data={entries} />
    </div>
  );
}
