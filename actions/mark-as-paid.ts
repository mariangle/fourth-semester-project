"use server";

import { getUser } from "@/actions/get-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const markAsPaid = async (entryIds: string[]) => {
  const user = await getUser();

  if (!user) {
    return {
      success: null,
      error: "Unauthenticated",
    };
  }

  await db.entry.updateMany({
    where: {
      id: {
        in: entryIds,
      },
    },
    data: {
      paid: true,
    },
  });

  revalidatePath("/users");

  return {
    success: "Marked as paid.",
    error: null,
  };
};

export const unmarkAsPaid = async (entryIds: string[]) => {
  const user = await getUser();

  if (!user) {
    return {
      success: null,
      error: "Unauthenticated",
    };
  }

  await db.entry.updateMany({
    where: {
      id: {
        in: entryIds,
      },
    },
    data: {
      paid: false,
    },
  });

  revalidatePath("/users");

  return {
    success: "Unmarked as paid.",
    error: null,
  };
};
