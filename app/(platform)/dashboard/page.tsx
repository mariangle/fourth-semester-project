import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function page() {
  const session = await auth();

  const entries = await db.entry.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return <div className="w-full">dashboard</div>;
}
