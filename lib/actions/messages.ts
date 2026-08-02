"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function toggleRead(formData: FormData): Promise<void> {
  await requireUser("ADMIN");
  const id = String(formData.get("id"));
  const read = formData.get("read") === "true";
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData): Promise<void> {
  await requireUser("ADMIN");
  const id = String(formData.get("id"));
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
