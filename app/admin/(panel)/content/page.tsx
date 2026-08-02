import type { Metadata } from "next";
import { getContent } from "@/lib/content-server";
import { ContentEditor } from "@/components/admin/content-editor";

export const metadata: Metadata = { title: "Edit Content" };

export default async function AdminContentPage() {
  const content = await getContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Site Content
      </h1>
      <p className="mb-8 mt-1 text-muted">
        Edit the copy shown across the public site. Changes publish instantly.
      </p>
      <ContentEditor content={content} />
    </div>
  );
}
