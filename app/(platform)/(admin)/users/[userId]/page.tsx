import Link from "next/link";

import { db } from "@/lib/db";
import { PageHeading } from "@/components/ui/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function User({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      paymentDetails: true,
    },
  });

  if (!user) return "not found";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href={`/users`}
          className={cn(buttonVariants({ variant: "secondary" }), "awdawd")}
        >
          Back
        </Link>
        <Link
          href={`/users/${user.id}/entries`}
          className={cn(buttonVariants({ variant: "secondary" }), "awdawd")}
        >
          View Registrations
        </Link>
      </div>
      <PageHeading
        title={user.name!}
        description={`Account and payment information.`}
      />
      <Card className="bg-transparent">
        <CardHeader>
          <Avatar className="mb-4">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>Account</CardTitle>
          <CardDescription>Email: {user.email}</CardDescription>
          <CardDescription>UserID: {user.id}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-transparent">
        <CardHeader className="space-y-4">
          <CardTitle>Payment Information</CardTitle>
          <div className="border p-4 rounded-md">
            <CardDescription>
              Full Name: {user.paymentDetails?.fullName}
            </CardDescription>
            <CardDescription>
              Address: {user.paymentDetails?.address}
            </CardDescription>
            <CardDescription>
              Email: {user.paymentDetails?.email}
            </CardDescription>
          </div>
          <div className="border p-4 rounded-md">
            <CardDescription>CPR: {user.paymentDetails?.cpr}</CardDescription>
            <CardDescription>
              Reg. Number: {user.paymentDetails?.registrationNumber}
            </CardDescription>
            <CardDescription>
              Acc. Number: {user.paymentDetails?.accountNumber}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
