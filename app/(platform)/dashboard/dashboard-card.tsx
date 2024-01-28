import { Card, CardHeader } from "@/components/ui/card";

export function DashboardCard({
  title,
  amount,
}: {
  title: string;
  amount: string;
}) {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-sm">{title}</h4>
        <p className="text-lg">{amount}</p>
      </CardHeader>
    </Card>
  );
}
