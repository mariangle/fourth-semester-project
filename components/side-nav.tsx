import { Navigation } from "@/components/navigation";
import { CreateButton } from "@/components/create-button";

export function SideNav() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="space-y-2 w-full">
        <CreateButton />
        <Navigation />
      </div>
    </div>
  );
}
