import { format, addMonths, subMonths } from "date-fns";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useView } from "@/hooks/use-view";

export function ViewNavigation() {
  const { month, setMonth } = useView();

  return (
    <div className="flex justify-between py-2 px-4 border-b">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMonth(subMonths(month, 1))}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMonth(addMonths(month, 1))}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <div className="w-[150px] text-center font-bold">
          {format(month, "MMMM yyyy")}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMonth(new Date())}
        >
          Today
        </Button>
        EXPORT IMPORT DATA
      </div>
    </div>
  );
}
