import { auth } from "@/lib/auth";
import { EntryForm } from "@/components/entry-form";
import { db } from "@/lib/db";

const getEntry = async (entryId: string) => {
  const session = await auth();

  if (!session?.user) throw Error();

  const entry = await db.entry.findUnique({
    where: {
      userId: session.user.id,
      id: entryId,
    },
  });

  return entry;
};

export default async function Entry({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const entry = await getEntry(params.id);
  return (
    <div>
      <EntryForm entry={entry} />
    </div>
  );
}
