import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = { title: "Admin — Sign in" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "";

  return (
    <main className="grid min-h-svh place-items-center bg-noir px-6 py-16 text-cream">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-10 rounded-3xl border border-cream/10 bg-cream/[0.03] p-8 md:p-10">
          <div className="flex items-center gap-2 text-gold">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Administrator
            </span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight">
            Site Administration
          </h1>
          <p className="mt-2 text-sm text-cream/60">
            Sign in to manage site content and enquiries.
          </p>
          <div className="mt-8">
            <LoginForm scope="admin" next={next} />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-cream/50">
          <Link href="/" className="transition-colors hover:text-cream">
            ← Back to site
          </Link>
        </p>

        {process.env.NODE_ENV !== "production" && (
          <p className="mt-4 text-center text-xs text-cream/30">
            Demo · admin@pjassetmanagement.com / ChangeMe!2026
          </p>
        )}
      </div>
    </main>
  );
}
