import type { Metadata } from "next";
import { getContent } from "@/lib/content-server";
import { getHomeLayout } from "@/lib/layout-server";
import { PageBuilder } from "@/components/admin/page-builder";

export const metadata: Metadata = { title: "Page Builder" };

export default async function AdminPagesPage() {
  const [content, layout] = await Promise.all([getContent(), getHomeLayout()]);

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Home Page Builder
      </h1>
      <p className="mb-8 mt-1 text-muted">
        Reorder, hide, and edit the blocks that make up the home page. Changes
        publish instantly.
      </p>
      <PageBuilder content={content} initialLayout={layout} />
    </div>
  );
}
