"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

const settingsLinks = [
  {
    href: "/settings/account",
    name: "Account",
  },
  {
    href: "/settings/general",
    name: "General",
  },
  {
    href: "/settings/payment-details",
    name: "Payment Details",
  },
];

export default function SettingsNav() {
  const path = usePathname();

  return (
    <div className="space-y-4">
      <nav className="border-b">
        <ul className="flex items-center">
          {settingsLinks.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-12 rounded-none border-b-2 border-b-transparent hover:border-b-primary hover:bg-transparent",
                  item.href === path && "border-b-primary"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
