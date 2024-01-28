import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeading } from "@/components/ui/page";
import { DashboardCard } from "./dashboard-card";
import { DatePickerWithRange } from "./range-picker";
import { startOfMonth, endOfMonth, parseISO, format } from "date-fns";
import { formatDurationFromMinutes } from "@/lib/utils";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const session = await auth();

  const fromDate = searchParams.from
    ? parseISO(searchParams.from)
    : startOfMonth(new Date());
  const toDate = searchParams.to
    ? parseISO(searchParams.to)
    : endOfMonth(new Date());

  const entries = await db.entry.findMany({
    where: {
      userId: session?.user?.id,
      date: {
        gte: fromDate,
        lte: toDate,
      },
    },
  });

  const hourlyWage = 130;
  const taxRate = 0.38;

  const totalMinutes = entries.reduce(
    (sum, entry) => sum + entry.timeInMinutes,
    0
  );

  const totalHours = totalMinutes / 60;
  const salary = totalHours * hourlyWage;
  const salaryAfterTaxes = salary * (1 - taxRate);

  const getDescription = () => {
    if (searchParams.from && !searchParams.to) {
      return `Overview for ${format(
        parseISO(`${searchParams.from}T00:00:00`),
        "MMMM d, yyyy"
      )}`;
    } else if (searchParams.from && searchParams.to) {
      return `Overview from ${format(
        parseISO(`${searchParams.from}T00:00:00`),
        "MMMM d, yyyy"
      )} to ${format(parseISO(`${searchParams.to}T00:00:00`), "MMMM d, yyyy")}`;
    } else {
      return `Overview for ${format(new Date(), "MMMM")}`;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between">
        <PageHeading title="Dashboard" description={getDescription()} />
        <DatePickerWithRange fromDate={fromDate} toDate={toDate} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Registrations"
          amount={entries.length.toString()}
        />
        <DashboardCard
          title="Total Hours"
          amount={formatDurationFromMinutes(totalMinutes)}
        />
        <DashboardCard title="Expected Salary" amount={`${salary} kr`} />
        <DashboardCard title="After taxes" amount={`${salaryAfterTaxes} kr`} />
      </div>
    </div>
  );
}
