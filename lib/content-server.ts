import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import {
  defaultContent,
  mergeContent,
  type ContentMap,
} from "@/lib/content";

/**
 * Returns site copy with any CMS overrides applied. Falls back to the
 * in-code defaults if the database is unreachable (e.g. before the first
 * migration), so the marketing site never fails to render.
 *
 * Wrapped in React.cache so multiple calls within one request (layout +
 * page) hit the database only once.
 */
export const getContent = cache(async (): Promise<ContentMap> => {
  try {
    const rows = await prisma.siteContent.findMany();
    const overrides = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return mergeContent(overrides);
  } catch {
    return { ...defaultContent };
  }
});
