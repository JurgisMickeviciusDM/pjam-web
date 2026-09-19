import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { Logo } from "./logo";
import { navItems } from "./nav-items";
import type { ContentMap } from "@/lib/content";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/p-j-asset-management/";
const DATA_INNOVATIONS_URL = "https://www.datainnovations.lt/";

export function Footer({ content }: { content: ContentMap }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-noir text-cream">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Brand + blurb */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-cream/60">
              {content["footer.blurb"]}
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="P&J Asset Management on LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.26em] text-cream/40">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.26em] text-cream/40">
              Access
            </h4>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/portal"
                  className="group inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Private Client Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 md:flex-row md:items-center">
          <p>
            © {year} P&amp;J Asset Management. All rights reserved.
          </p>
          <p>
            Built by{" "}
            <a
              href={DATA_INNOVATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              {content["footer.builtBy"]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
