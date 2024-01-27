import { PaymentForm } from "./payment-form";
import { CreditCard } from "@/components/credit-card";
import { Button } from "@/components/ui/button";
import { deletePayment, getPayment } from "@/actions/payment";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default async function page() {
  const payment = await getPayment();

  return (
    <div className="space-y-4">
      {payment && (
        <div className="space-y-4">
          <Alert variant="info" className="space-y-4">
            <AlertTitle className="flex items-center gap-2">
              <Info className="text-blue-500 w-4 h-4" />
              If you wish to make changes, delete your current payment details.
            </AlertTitle>
            <form
              action={async () => {
                "use server";
                await deletePayment(payment.id);
              }}
            >
              <Button>Delete Payment</Button>
            </form>
          </Alert>
          <CreditCard paymentInfo={payment} />
        </div>
      )}
      {!payment && <PaymentForm />}
    </div>
  );
}
