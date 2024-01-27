import * as z from "zod";

export const entryFormSchema = z.object({
  time: z.string().min(1, { message: "Time must be at least 1 minute." }),
  note: z.string(),
  date: z.date({
    required_error: "A date is required.",
  }),
  remote: z.boolean(),
});

export type EntryFormValues = z.infer<typeof entryFormSchema>;

const isValidNumber = (value: string): boolean => {
  const parsedValue = parseInt(value, 10);
  return !isNaN(parsedValue) && isFinite(parsedValue);
};

export const paymentFormSchema = z.object({
  fullName: z.string(),
  address: z.string(),
  cpr: z.string().refine(isValidNumber, {
    message: "Invalid CPR number. Please enter a valid number.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  registrationNumber: z.string().refine(isValidNumber, {
    message: "Please enter a valid number.",
  }),
  accountNumber: z.string().refine(isValidNumber, {
    message: "Please enter a valid number.",
  }),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
