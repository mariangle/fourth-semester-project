"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, Layers, BookText, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  {
    href: "/dashboard",
    name: "Dashboard",
    icon: Layers,
  },
  {
    href: "/registration",
    name: "Registration",
    icon: BookText,
  },
  {
    href: "/users",
    name: "Users",
    icon: Users,
  },
  {
    href: "/settings/account",
    name: "Settings",
    icon: Settings,
  },
];

export function Navigation({ close }: { close?: () => void }) {
  const path = usePathname();

  return (
    <nav>
      <div className="flex flex-col space-y-2">
        {navLinks.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            onClick={() => close && close()}
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
