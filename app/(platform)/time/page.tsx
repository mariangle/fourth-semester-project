import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "./header";
import { TableView } from "@/components/table-view";
import { ViewWrapper } from "@/components/view-wrapper";
import { CalendarView } from "@/components/calendar-view";
import { PageHeading } from "@/components/ui/page";

export default async function Time() {
  const session = await auth();

  const entries = await db.entry.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="w-full">
      <PageHeading title="Calendar" description="Your registration." />
      <Header />
      <ViewWrapper
        table={<TableView entries={entries} />}
        calendar={<CalendarView entries={entries} />}
      />
    </div>
  );
}
