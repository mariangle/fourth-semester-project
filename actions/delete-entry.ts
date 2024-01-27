"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ServerResponse } from "@/lib/server";
import { revalidatePath } from "next/cache";

export const deleteEntry = async (entryId: string): Promise<ServerResponse> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: null,
        error: "Unauthenticated",
      };
    }

    const userId = session.user.id;

    const deleteResult = await db.entry.deleteMany({
      where: {
        id: entryId,
        userId,
      },
    });

    if (deleteResult.count === 0) {
      return {
        success: null,
        error: "Unauthorized",
      };
    }

    revalidatePath("/dashboard");

    return {
      success: "Entry deleted!",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: null,
      error: "Internal server error",
    };
  }
};
