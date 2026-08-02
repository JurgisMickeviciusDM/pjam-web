"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { defaultContent } from "@/lib/content";

export interface SaveState {
  ok?: boolean;
  error?: string;
  at?: number;
}

export async function saveContent(
  _prev: SaveState | undefined,
  formData: FormData,
): Promise<SaveState> {
  try {
    await requireUser("ADMIN");
  } catch {
    return { error: "You must be an administrator to edit content." };
  }

  const entries = [...formData.entries()].filter(
    ([key]) => key in defaultContent,
  );

  try {
    await Promise.all(
      entries.map(([key, raw]) => {
        const value = String(raw);
        // If the value matches the built-in default, drop the override so
        // the DB only stores genuine changes.
        if (value === defaultContent[key]) {
          return prisma.siteContent.deleteMany({ where: { key } });
        }
        return prisma.siteContent.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }),
    );
  } catch (error) {
    console.error("[cms] failed to save content", error);
    return { error: "Could not save changes. Please try again." };
  }

  // Refresh every page that renders CMS content.
  revalidatePath("/", "layout");

  return { ok: true, at: Date.now() };
}
