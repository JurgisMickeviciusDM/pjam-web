import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Logo } from "@/components/site/logo";
import { LogoutButton } from "@/components/site/logout-button";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-svh bg-cream">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4 text-sm">
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="hidden text-muted transition-colors hover:text-ink sm:inline"
              >
                Admin
              </Link>
            )}
            <span className="hidden text-muted sm:inline">{user?.name}</span>
            <LogoutButton className="rounded-full border border-ink/15 px-4 py-2 font-medium text-ink transition-colors hover:bg-ink hover:text-cream" />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
