import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ViewNavigation } from "@/components/view-navigation";
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
      <PageHeading
        title="Registration"
        description="View your hours and register new ones."
      />
      <div className="bg-gray-50 dark:bg-gray-950 border rounded-lg overflow-hidden">
        <ViewNavigation />
        <CalendarView entries={entries} />
      </div>
    </div>
  );
}
