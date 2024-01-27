import { getUser } from "@/actions/get-user";
import { db } from "@/lib/db";

export const getPayment = async () => {
  const user = await getUser();

  const payment = await db.payment.findFirst({
    where: {
      userId: user?.id,
    },
  });

  return payment;
};
