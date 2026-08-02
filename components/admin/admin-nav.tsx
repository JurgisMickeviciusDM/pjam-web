"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex gap-1 md:flex-col">
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.href, link.exact);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-ink text-cream"
                : "text-olive/70 hover:bg-ink/5 hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
