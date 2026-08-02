import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TrendingUp, TrendingDown, Megaphone } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Your Portfolio" };

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function PortalDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const [holdings, announcements] = await Promise.all([
    prisma.portfolioHolding.findMany({
      where: { userId: user.id },
      orderBy: { value: "desc" },
    }),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
  ]);

  const total = holdings.reduce((sum, h) => sum + h.value, 0);
  const weightedChange =
    total > 0
      ? holdings.reduce((sum, h) => sum + h.value * h.changePct, 0) / total
      : 0;

  return (
    <div className="container-x py-12 md:py-16">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            Welcome back, {user.name.split(" ")[0]}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Your Portfolio
          </h1>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-navy p-7 text-cream">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Total value
          </div>
          <div className="mt-3 font-display text-4xl font-extrabold tracking-tight">
            {currency.format(total)}
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-sand p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Trailing performance
          </div>
          <div
            className={`mt-3 inline-flex items-center gap-2 font-display text-4xl font-extrabold tracking-tight ${
              weightedChange >= 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            {weightedChange >= 0 ? (
              <TrendingUp className="h-7 w-7" />
            ) : (
              <TrendingDown className="h-7 w-7" />
            )}
            {weightedChange >= 0 ? "+" : ""}
            {weightedChange.toFixed(1)}%
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-sand p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Positions
          </div>
          <div className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">
            {holdings.length}
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          Holdings
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold">Holding</th>
                <th className="px-6 py-4 font-semibold">Class</th>
                <th className="px-6 py-4 text-right font-semibold">Allocation</th>
                <th className="px-6 py-4 text-right font-semibold">Value</th>
                <th className="px-6 py-4 text-right font-semibold">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {holdings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted">
                    No holdings on record yet.
                  </td>
                </tr>
              ) : (
                holdings.map((h) => (
                  <tr key={h.id} className="bg-cream">
                    <td className="px-6 py-4 font-medium text-ink">{h.name}</td>
                    <td className="px-6 py-4 text-olive/70">{h.category}</td>
                    <td className="px-6 py-4 text-right text-olive/70">
                      {h.allocation}%
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-ink">
                      {currency.format(h.value)}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-medium ${
                        h.changePct >= 0 ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {h.changePct >= 0 ? "+" : ""}
                      {h.changePct.toFixed(1)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          Announcements
        </h2>
        <div className="mt-4 space-y-4">
          {announcements.length === 0 ? (
            <p className="text-muted">No announcements right now.</p>
          ) : (
            announcements.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-ink/10 bg-sand p-6"
              >
                <div className="flex items-center gap-2 text-gold">
                  <Megaphone className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    {dateFmt.format(a.createdAt)}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 leading-relaxed text-olive/80">{a.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
