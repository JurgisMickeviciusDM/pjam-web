import { getCurrentUser } from "@/lib/auth";
import { Logo } from "@/components/site/logo";
import { LogoutButton } from "@/components/site/logout-button";
import { AdminNav } from "@/components/admin/admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-svh bg-cream">
      <header className="border-b border-ink/10 bg-cream">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-muted sm:inline">{user?.name}</span>
            <LogoutButton className="rounded-full border border-ink/15 px-4 py-2 font-medium text-ink transition-colors hover:bg-ink hover:text-cream" />
          </div>
        </div>
      </header>

      <div className="container-x grid gap-8 py-8 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-8 md:self-start">
          <AdminNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
