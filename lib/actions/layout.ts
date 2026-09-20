"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { defaultContent } from "@/lib/content";
import {
  HOME_LAYOUT_KEY,
  HOME_BLOCK_IDS,
  resolveHomeLayout,
  type LayoutBlock,
} from "@/lib/home-blocks";

export interface SaveHomeInput {
  blocks: LayoutBlock[];
  content: Record<string, string>;
}

export interface SaveHomeState {
  ok?: boolean;
  error?: string;
  at?: number;
}

export async function saveHomePage(
  _prev: SaveHomeState | undefined,
  input: SaveHomeInput,
): Promise<SaveHomeState> {
  try {
    await requireUser("ADMIN");
  } catch {
    return { error: "You must be an administrator to edit the page." };
  }

  // Normalise the layout: keep only known blocks, in the given order.
  const valid = new Set(HOME_BLOCK_IDS);
  const seen = new Set<string>();
  const ordered: LayoutBlock[] = [];
  for (const block of input.blocks ?? []) {
    if (valid.has(block.blockId) && !seen.has(block.blockId)) {
      ordered.push({ blockId: block.blockId, hidden: Boolean(block.hidden) });
      seen.add(block.blockId);
    }
  }
  const layout = resolveHomeLayout(ordered);

  // Only accept content keys that exist in the code defaults.
  const contentEntries = Object.entries(input.content ?? {}).filter(
    ([key]) => key in defaultContent,
  );

  try {
    await prisma.$transaction([
      // Persist the block order + visibility as JSON.
      prisma.siteContent.upsert({
        where: { key: HOME_LAYOUT_KEY },
        update: { value: JSON.stringify(layout) },
        create: { key: HOME_LAYOUT_KEY, value: JSON.stringify(layout) },
      }),
      // Persist text: store genuine changes, drop overrides equal to default.
      ...contentEntries.map(([key, raw]) => {
        const value = String(raw);
        if (value === defaultContent[key]) {
          return prisma.siteContent.deleteMany({ where: { key } });
        }
        return prisma.siteContent.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }),
    ]);
  } catch (error) {
    console.error("[cms] failed to save home page", error);
    return { error: "Could not save changes. Please try again." };
  }

  // Publish: refresh every page that renders CMS content.
  revalidatePath("/", "layout");

  return { ok: true, at: Date.now() };
}
