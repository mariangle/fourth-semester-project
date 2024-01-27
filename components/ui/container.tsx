import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-screen-xl w-full mx-auto", className)}>
      {children}
    </div>
  );
}
