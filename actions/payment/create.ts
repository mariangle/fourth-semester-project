"use server";

import { PaymentFormValues } from "@/lib/validations";
import { getUser } from "@/actions/get-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createPayment = async (data: PaymentFormValues) => {
  const user = await getUser();

  if (!user) {
    return {
      success: null,
      error: "Unauthenticated",
    };
  }

  await db.payment.create({
    data: {
      userId: user.id,
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      cpr: parseInt(data.cpr),
      registrationNumber: parseInt(data.registrationNumber),
      accountNumber: parseInt(data.accountNumber),
    },
  });

  revalidatePath("/settings/payment-details");

  return {
    success: "Payment information saved.",
    error: null,
  };
};
