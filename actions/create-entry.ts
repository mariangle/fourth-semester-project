"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { EntryFormValues } from "@/lib/validations";
import { ServerResponse } from "@/lib/server";
import { revalidatePath } from "next/cache";
import { calculateMinutesFromTime } from "@/lib/utils";

export const createEntry = async (
  data: EntryFormValues
): Promise<ServerResponse> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: null,
        error: "Unauthenticated",
      };
    }

    const foundUser = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!foundUser) {
      throw new Error("NO USER");
    }

    revalidatePath("/dashboard");

    const entry = await db.entry.create({
      data: {
        userId: foundUser.id,
        note: data.note,
        timeInMinutes: calculateMinutesFromTime(data.time),
        date: data.date,
        remote: data.remote,
      },
    });

    return {
      success: null,
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: "Internal server error",
    };
  }
};
