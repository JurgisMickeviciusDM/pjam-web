import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import type { ContentMap } from "@/lib/content";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/media/parallax-image";
import { ButtonLink } from "@/components/ui/button";

/**
 * The public home page is composed of these blocks. Each one is a self-
 * contained <section> that renders from the merged content map. The order and
 * visibility are controlled from the admin page builder (/admin/pages) and
 * resolved in app/(marketing)/page.tsx.
 */

type BlockProps = { c: ContentMap };

const ASSET_CLASSES = [
  "Real Estate",
  "Private Equity",
  "Fixed Income",
  "Global Equities",
  "Strategic Ventures",
  "Corporate Credit",
];

function HeroBlock({ c }: BlockProps) {
  return (
    <section className="grain relative flex min-h-svh items-end overflow-hidden bg-noir text-cream">
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
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/30"
      />

      <div className="container-x relative w-full pb-24 pt-40">
        <Reveal direction="none" duration={0.9}>
          <span className="eyebrow text-gold">{c["brand.tagline"]}</span>
        </Reveal>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,8.5vw,6.5rem)] font-extrabold leading-[0.98] tracking-tight">
          <TextReveal
            lines={[c["home.hero.titleTop"], c["home.hero.titleBottom"]]}
            delay={0.15}
          />
        </h1>

        <Reveal delay={0.55} className="mt-8 max-w-xl">
          <p className="text-lg leading-relaxed text-cream/70">
            {c["home.hero.subtitle"]}
          </p>
        </Reveal>

        <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/strategy" variant="light" withArrow>
            {c["home.hero.ctaPrimary"]}
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            {c["home.hero.ctaSecondary"]}
          </ButtonLink>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-cream/40">
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function StrategiesBlock({ c }: BlockProps) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow text-muted">
              {c["home.strategies.eyebrow"]}
            </span>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            <TextReveal
              lines={[
                c["home.strategies.titleTop"],
                c["home.strategies.titleBottom"],
              ]}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-olive/80">
              {c["home.strategies.body"]}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/strategy"
              className="group mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-ink"
            >
              {c["home.strategies.link"]}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal direction="left">
          <ParallaxImage
            src="/media/staircase.webp"
            alt="Minimalist architectural staircase"
            aspect="aspect-[4/5]"
          />
        </Reveal>
      </div>
    </section>
  );
}

function StatsBlock({ c }: BlockProps) {
  return (
    <section className="grain bg-noir py-20 text-cream">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {[
            [c["home.stats.s1v"], c["home.stats.s1l"]],
            [c["home.stats.s2v"], c["home.stats.s2l"]],
            [c["home.stats.s3v"], c["home.stats.s3l"]],
            [c["home.stats.s4v"], c["home.stats.s4l"]],
          ].map(([value, label], i) => (
            <StaggerItem key={i} className="border-l border-cream/15 pl-6">
              <div className="font-display text-4xl font-extrabold tracking-tight text-gold md:text-5xl">
                {value}
              </div>
              <div className="mt-3 text-sm text-cream/60">{label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ResponsibleBlock({ c }: BlockProps) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal direction="right" className="order-2 md:order-1">
          <ParallaxImage
            src="/media/spheres.webp"
            alt="Balanced sculptural spheres resting on curved forms"
            aspect="aspect-[4/5]"
            speed={0.16}
          />
        </Reveal>

        <div className="order-1 md:order-2">
          <Reveal>
            <span className="eyebrow text-muted">
              {c["home.responsible.eyebrow"]}
            </span>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            <TextReveal
              lines={[
                c["home.responsible.titleTop"],
                c["home.responsible.titleBottom"],
              ]}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-olive/80">
              {c["home.responsible.body"]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OriginsBlock({ c }: BlockProps) {
  return (
    <section className="grain relative overflow-hidden bg-noir py-24 text-cream md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] font-extrabold leading-none text-cream/[0.04]"
      >
        {c["home.origins.watermark"]}
      </div>
      <div className="container-x relative max-w-3xl">
        <Reveal>
          <span className="eyebrow text-gold">{c["home.origins.eyebrow"]}</span>
        </Reveal>
        <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          <TextReveal lines={[c["home.origins.title"]]} />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg leading-relaxed text-cream/70">
            {c["home.origins.body"]}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ButtonLink
            href="/about"
            variant="outline-light"
            withArrow
            className="mt-10"
          >
            {c["home.origins.link"]}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function PartnershipBlock({ c }: BlockProps) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-muted">
              {c["home.partnership.eyebrow"]}
            </span>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            <TextReveal lines={[c["home.partnership.title"]]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-olive/80">
              {c["home.partnership.body"]}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <a
            href="https://www.datainnovations.lt/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-ink/10 bg-sand px-8 py-7 transition-colors hover:border-ink/25"
          >
            <div className="flex items-center gap-5">
              <Image
                src="/media/data-innovations.png"
                alt="Data Innovations"
                width={1892}
                height={1892}
                className="h-20 w-20 shrink-0 object-contain md:h-24 md:w-24"
              />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                  {c["home.partnership.partnerLabel"]}
                </div>
                <div className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
                  {c["home.partnership.partnerName"]}
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
          </a>
        </Reveal>
      </div>

      {/* Asset-class marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-ink/10 py-6">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...ASSET_CLASSES, ...ASSET_CLASSES].map((label, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl font-bold tracking-tight text-olive/40">
                {label}
              </span>
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock({ c }: BlockProps) {
  return (
    <section className="bg-noir py-24 text-cream md:py-28">
      <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {c["home.cta.title"]}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <ButtonLink href="/contact" variant="light" withArrow>
            {c["home.cta.button"]}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/** Registry: block id → component. Order/visibility live in the DB layout. */
export const homeBlockComponents: Record<string, ComponentType<BlockProps>> = {
  "home-hero": HeroBlock,
  "home-strategies": StrategiesBlock,
  "home-stats": StatsBlock,
  "home-responsible": ResponsibleBlock,
  "home-origins": OriginsBlock,
  "home-partnership": PartnershipBlock,
  "home-cta": CtaBlock,
};
