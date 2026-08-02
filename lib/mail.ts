import "server-only";
import nodemailer from "nodemailer";

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

/**
 * Sends a notification e-mail for a new contact submission. If no SMTP
 * server is configured the message is logged instead, so local development
 * works out of the box (submissions are still persisted to the database).
 */
export async function sendContactNotification(
  payload: ContactPayload,
): Promise<void> {
  const host = process.env.SMTP_HOST;

  if (!host) {
    console.info(
      "[contact] SMTP not configured — skipping e-mail. Payload:",
      payload,
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  const to = process.env.CONTACT_TO ?? process.env.SMTP_USER ?? host;
  const from = process.env.SMTP_FROM ?? "no-reply@pjassetmanagement.com";

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `New enquiry from ${payload.firstName} ${payload.lastName}`,
    text: [
      `Name:  ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      "",
      payload.message,
    ].join("\n"),
  });
}
