import { Label } from "@/components/ui/label";

export default function AccountForm() {
  return (
    <form>
      <div className="flex flex-col items-start justify-start gap-2 rounded-lg border p-4">
        <Label>Delete your account.</Label>
        <p className="text-sm text-muted-foreground">
          This action is not irresible.
        </p>
      </div>
    </form>
  );
}
