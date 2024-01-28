import Link from "next/link";

import { UserMenu } from "@/components/user-menu";
import { SideNav } from "./side-nav";
import { MobileSidebar } from "./mobile-sidebar";
import { Logo } from "@/components/ui/logo";
import { CreateButton } from "@/components/create-button";
import { ModeToggle } from "@/components/theme-switch";

export function Sidebar() {
  return (
    <div className="p-4 flex flex-row lg:flex-col justify-between">
      <div className="flex lg:flex-col items-center justify-between gap-4">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
        <Link href="/" className="items-center hidden lg:flex gap-2 text-sm">
          <Logo />
          IntelligentBanker
        </Link>
        <div className="hidden lg:flex w-full">
          <SideNav />
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <CreateButton />
        </div>
      </div>
      <div className="flex lg:flex-col">
        <ModeToggle />
        <UserMenu />
      </div>
    </div>
  );
}
