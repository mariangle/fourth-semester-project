import Link from "next/link";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { PageHeading } from "@/components/ui/page";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Users() {
  const users = await db.user.findMany();

  return (
    <div>
      <PageHeading title="Users" description="Overview of your employees." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h3>{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/users/${user.id}/entries`}
                className={cn(buttonVariants({ variant: "default" }), "awdawd")}
              >
                Registrations
              </Link>
              <Link
                href={`/users/${user.id}`}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "awdawd"
                )}
              >
                Payment Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
