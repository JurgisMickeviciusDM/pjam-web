import type { Metadata } from "next";
import { Mail, Trash2, Check, Circle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toggleRead, deleteMessage } from "@/lib/actions/messages";

export const metadata: Metadata = { title: "Enquiries" };

const dateFmt = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Enquiries
      </h1>
      <p className="mb-8 mt-1 text-muted">
        Messages submitted through the contact form.
      </p>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-sand px-6 py-16 text-center text-muted">
          <Mail className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-4">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <article
              key={m.id}
              className={`rounded-2xl border p-6 transition-colors ${
                m.read
                  ? "border-ink/10 bg-cream"
                  : "border-gold/40 bg-gold/[0.06]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink">
                    {m.firstName} {m.lastName}
                    {!m.read && (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-ink">
                        New
                      </span>
                    )}
                  </h2>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-olive/70 underline-offset-2 hover:underline"
                  >
                    {m.email}
                  </a>
                </div>
                <span className="text-xs text-muted">
                  {dateFmt.format(m.createdAt)}
                </span>
              </div>

              <p className="mt-4 whitespace-pre-wrap leading-relaxed text-olive/85">
                {m.message}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <form action={toggleRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input
                    type="hidden"
                    name="read"
                    value={(!m.read).toString()}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-olive transition-colors hover:bg-ink hover:text-cream"
                  >
                    {m.read ? (
                      <>
                        <Circle className="h-3.5 w-3.5" /> Mark unread
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" /> Mark read
                      </>
                    )}
                  </button>
                </form>

                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
