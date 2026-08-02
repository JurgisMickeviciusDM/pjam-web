"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

function safeNext(value: FormDataEntryValue | null, fallback: string): string {
  const next = typeof value === "string" ? value : "";
  // Only allow internal, absolute paths to avoid open-redirects.
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  return fallback;
}

export async function login(
  _prev: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const scope = String(formData.get("scope") ?? "portal");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  if (scope === "admin" && user.role !== "ADMIN") {
    return { error: "This account does not have administrator access." };
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const fallback = scope === "admin" ? "/admin" : "/portal";
  redirect(safeNext(formData.get("next"), fallback));
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/");
}
