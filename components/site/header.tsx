"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Lock, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { navItems } from "./nav-items";
import { cn } from "@/lib/utils";

const LINKEDIN_URL = "https://www.linkedin.com/company/p-j-asset-management/";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream/90 py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "bg-transparent py-5",
        )}
      >
        <div className="container-x flex items-center justify-between">
          <Logo priority />

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "group inline-flex items-center gap-3 transition-colors",
              scrolled ? "text-ink" : "text-cream",
            )}
          >
            <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.28em] sm:inline">
              Menu
            </span>
            <span
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300",
                scrolled
                  ? "border-ink/20 group-hover:border-gold group-hover:bg-ink group-hover:text-cream"
                  : "border-cream/30 group-hover:border-gold",
              )}
            >
              <Menu className="h-5 w-5" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="grain fixed inset-0 z-[60] overflow-hidden bg-noir text-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(242,194,0,0.1),transparent_60%)] blur-3xl"
            />

            <div className="container-x flex h-full flex-col">
              <div className="flex items-center justify-between py-5">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid flex-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
                <nav className="flex flex-col">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-4 border-b border-cream/10 py-4 font-display text-4xl font-extrabold tracking-tight transition-colors hover:text-gold md:text-6xl",
                          isActive(item.href) && "text-gold",
                        )}
                      >
                        <span className="font-body text-xs font-medium text-cream/30">
                          0{i + 1}
                        </span>
                        {item.label}
                        <ArrowUpRight className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Cinematic side panel */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="hidden md:block"
                >
                  <div className="vignette relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/media/eclipse-poster.jpg"
                    >
                      <source src="/media/eclipse.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-sm text-cream/70">
                        A diversified investment firm — building lasting value
                        through disciplined, long-term investing.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 border-t border-cream/10 py-6 md:flex-row md:items-center">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  <Lock className="h-4 w-4" />
                  Private Client Portal
                </Link>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/60 transition-colors hover:text-cream"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
