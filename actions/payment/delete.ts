"use server";

import { getUser } from "@/actions/get-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deletePayment = async (paymentId: string) => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        success: null,
        error: "Unauthenticated",
      };
    }

    await db.payment.delete({
      where: {
        id: paymentId,
        userId: user.id,
      },
    });

    revalidatePath("/settings/payment-details");

    return {
      success: "Payment information saved.",
      error: null,
    };
  } catch (error) {
    console.log(error);
  }
};
