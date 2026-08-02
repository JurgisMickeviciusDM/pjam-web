import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/mail";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check your input.";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const data = parsed.data;

  try {
    await prisma.contactMessage.create({ data });
  } catch (error) {
    console.error("[contact] failed to persist message", error);
    return NextResponse.json(
      { error: "We couldn't save your message. Please try again later." },
      { status: 500 },
    );
  }

  // Send the notification e-mail without blocking (or failing) the response.
  void sendContactNotification(data).catch((error) =>
    console.error("[contact] email notification failed", error),
  );

  return NextResponse.json({ ok: true });
}
