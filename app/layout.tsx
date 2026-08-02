import type { Metadata } from "next";
import { Manrope, Wix_Madefor_Text } from "next/font/google";
import "./globals.css";

const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const body = Wix_Madefor_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-madefor",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "P&J Asset Management — Diversified Investment Firm",
    template: "%s | P&J Asset Management",
  },
  description:
    "P&J Asset Management is a diversified investment firm focused on real estate, private enterprise, and strategic ventures — building lasting value through disciplined, long-term investing.",
  openGraph: {
    title: "P&J Asset Management",
    description:
      "A diversified investment firm focused on real estate, private enterprise, and strategic ventures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
