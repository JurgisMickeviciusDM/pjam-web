import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import {
  HOME_LAYOUT_KEY,
  resolveHomeLayout,
  type LayoutBlock,
} from "@/lib/home-blocks";

/**
 * Returns the ordered home-page block layout with any admin overrides applied.
 * Falls back to the code default order if the database is unreachable or the
 * stored JSON is malformed, so the marketing site never fails to render.
 *
 * Wrapped in React.cache so the page + builder hit the database once per
 * request.
 */
export const getHomeLayout = cache(async (): Promise<LayoutBlock[]> => {
  try {
    const row = await prisma.siteContent.findUnique({
      where: { key: HOME_LAYOUT_KEY },
    });
    if (!row) return resolveHomeLayout(null);
    const parsed = JSON.parse(row.value) as LayoutBlock[];
    return resolveHomeLayout(parsed);
  } catch {
    return resolveHomeLayout(null);
  }
});
