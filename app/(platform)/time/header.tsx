"use client";

import { Button } from "@/components/ui/button";
import { useView } from "@/hooks/use-view";
import { cn } from "@/lib/utils";
import { views } from "@/hooks/use-view";

export function Header() {
  const { view, setView } = useView();

  return (
    <div>
      <div className="border-b w-full flex items-center justify-between bg-secondary px-4">
        <ul className="flex items-center">
          {views.map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={cn(
                  "h-12 rounded-none border-b-2 border-b-transparent",
                  view === item.value && "border-b-primary"
                )}
                onClick={() => setView(item.value)}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
