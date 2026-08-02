"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={cn("inline-flex items-center gap-1.5", className)}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
