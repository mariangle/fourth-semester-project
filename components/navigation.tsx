"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Timer, Settings, Layers } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  {
    href: "/dashboard",
    name: "Dashboard",
    icon: Layers,
  },
  {
    href: "/time",
    name: "Time",
    icon: Timer,
  },
  {
    href: "/settings/account",
    name: "Settings",
    icon: Settings,
  },
];

export function Navigation() {
  const path = usePathname();

  return (
    <nav>
      <div className="flex flex-col space-y-2">
        {navLinks.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "justify-start px-3",
              link.href === path && "bg-secondary dark:bg-primary/50"
            )}
          >
            <link.icon className="w-4 h-4 mr-2" />
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
