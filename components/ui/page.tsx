import { cn } from "@/lib/utils";

export function PageHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2 mb-4", className)}>
      <h1 className="text-2xl text-foreground font-semibold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
