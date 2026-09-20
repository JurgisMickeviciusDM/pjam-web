/**
 * Metadata for the blocks that make up the public home page.
 *
 * This is the single source of truth for the DEFAULT block order. The admin
 * page builder (/admin/pages) lets an administrator reorder and hide blocks;
 * that layout is stored in the database (see lib/layout-server.ts) and merged
 * on top of this default order.
 *
 * Kept free of JSX / component imports so it is safe to import from both the
 * server (public page) and the client (builder UI).
 */

export interface HomeBlockMeta {
  /** Stable id, also the key used in the stored layout + block registry. */
  id: string;
  /** Human label shown in the builder. */
  title: string;
  /** Matching section id in `contentSchema` (lib/content.ts) whose fields
   *  this block renders. Lets the builder show the right text inputs. */
  schemaId: string;
  /** Short description shown under the title in the builder. */
  hint: string;
}

export const HOME_BLOCK_META: HomeBlockMeta[] = [
  {
    id: "home-hero",
    title: "Hero",
    schemaId: "home-hero",
    hint: "Full-screen eclipse video with headline + buttons",
  },
  {
    id: "home-strategies",
    title: "Investment Strategies",
    schemaId: "home-strategies",
    hint: "Text + staircase image",
  },
  {
    id: "home-stats",
    title: "Stats band",
    schemaId: "home-stats",
    hint: "Four key figures on a dark band",
  },
  {
    id: "home-responsible",
    title: "Responsible Investment",
    schemaId: "home-responsible",
    hint: "Spheres image + philosophy text",
  },
  {
    id: "home-origins",
    title: "Origins",
    schemaId: "home-origins",
    hint: "Dark section with the story + large background number",
  },
  {
    id: "home-partnership",
    title: "Strategic Partnership",
    schemaId: "home-partnership",
    hint: "Partner card + asset-class marquee",
  },
  {
    id: "home-cta",
    title: "Closing call-to-action",
    schemaId: "home-cta",
    hint: "Final dark band inviting contact",
  },
];

/** All valid home block ids, in their default order. */
export const HOME_BLOCK_IDS: string[] = HOME_BLOCK_META.map((b) => b.id);

/** One stored block in a page layout. */
export interface LayoutBlock {
  blockId: string;
  hidden: boolean;
}

/** The reserved SiteContent key that stores the home layout JSON. */
export const HOME_LAYOUT_KEY = "__layout.home";

/**
 * Merge a stored layout (possibly partial or stale) with the code defaults so
 * the result always lists every known block exactly once, in a sane order:
 * stored blocks first (respecting their order + hidden flag), then any blocks
 * added in code since the layout was saved, appended and visible.
 */
export function resolveHomeLayout(
  stored: LayoutBlock[] | null | undefined,
): LayoutBlock[] {
  const valid = new Set(HOME_BLOCK_IDS);
  const seen = new Set<string>();
  const result: LayoutBlock[] = [];

  for (const block of stored ?? []) {
    if (valid.has(block.blockId) && !seen.has(block.blockId)) {
      result.push({ blockId: block.blockId, hidden: Boolean(block.hidden) });
      seen.add(block.blockId);
    }
  }
  for (const id of HOME_BLOCK_IDS) {
    if (!seen.has(id)) result.push({ blockId: id, hidden: false });
  }
  return result;
}
