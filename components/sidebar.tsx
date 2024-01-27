import Link from "next/link";

import { UserMenu } from "@/components/user-menu";
import { ModeToggle } from "@/components/theme-switch";
import { Navigation } from "@/components/navigation";
import { CreateButton } from "@/components/create-button";

export function Sidebar() {
  return (
    <aside className="w-[250px] flex flex-col py-8">
      <div className="p-2 h-12">
        <Link href="/" className="flex items-center gap-2 text-sm">
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-700 text-white h-8 w-8 flex items-center justify-center rounded-md text-center">
            IB
          </div>
          IntelligentBanker
        </Link>
      </div>
      <div className="p-2 flex flex-col justify-between h-full">
        <div className="space-y-2 w-full">
          <CreateButton />
          <Navigation />
        </div>
        <div>
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </aside>
  );
}
