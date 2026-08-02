import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, MailOpen, Users, FileText, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const [totalMessages, unread, clients, overrides, recent] = await Promise.all(
    [
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.siteContent.count(),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ],
  );

  const stats = [
    { label: "Total enquiries", value: totalMessages, icon: Inbox },
    { label: "Unread", value: unread, icon: MailOpen },
    { label: "Clients", value: clients, icon: Users },
    { label: "Content overrides", value: overrides, icon: FileText },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Dashboard
      </h1>
      <p className="mt-1 text-muted">Overview of your site activity.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-ink/10 bg-sand p-6"
            >
              <Icon className="h-5 w-5 text-olive/60" />
              <div className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          Recent enquiries
        </h2>
        <Link
          href="/admin/messages"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-ink"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-ink/5 overflow-hidden rounded-2xl border border-ink/10">
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-muted">No enquiries yet.</p>
        ) : (
          recent.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between gap-4 bg-cream px-6 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">
                  {m.firstName} {m.lastName}
                  {!m.read && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-gold align-middle" />
                  )}
                </p>
                <p className="truncate text-sm text-muted">{m.email}</p>
              </div>
              <p className="hidden max-w-md truncate text-sm text-olive/70 md:block">
                {m.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
