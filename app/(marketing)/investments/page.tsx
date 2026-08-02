import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { getContent } from "@/lib/content-server";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { GrowBar } from "@/components/motion/grow-bar";
import { WorldMap } from "@/components/media/world-map";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Investments" };

const SEGMENT_COLORS = ["#0b1c3a", "#3e3d35", "#f2c200", "#a9ab98"];

const APPROACH = [
  {
    title: "Rigorous due diligence",
    body: "Every position is evaluated through detailed financial analysis, strategic foresight, and comprehensive risk assessment.",
  },
  {
    title: "Long-term horizon",
    body: "We hold with conviction, allowing quality assets to compound value across full market cycles.",
  },
  {
    title: "Active diversification",
    body: "Exposure is balanced across asset classes and geographies to blend growth with resilience.",
  },
];

export default async function InvestmentsPage() {
  const c = await getContent();

  const allocations = [
    { label: c["investments.alloc.a1l"], value: Number(c["investments.alloc.a1v"]) },
    { label: c["investments.alloc.a2l"], value: Number(c["investments.alloc.a2v"]) },
    { label: c["investments.alloc.a3l"], value: Number(c["investments.alloc.a3v"]) },
    { label: c["investments.alloc.a4l"], value: Number(c["investments.alloc.a4v"]) },
  ];

  let cursor = 0;
  const stops = allocations
    .map((a, i) => {
      const start = cursor;
      cursor += a.value;
      return `${SEGMENT_COLORS[i]} ${start}% ${cursor}%`;
    })
    .join(", ");

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        lines={[c["investments.hero.titleTop"], c["investments.hero.titleBottom"]]}
        subtitle={c["investments.intro"]}
      />

      {/* Global presence — animated map + moving figures */}
      <section className="grain relative overflow-hidden bg-char py-24 text-cream md:py-32">
        {/* Floating sphere "figures" */}
        <div
          aria-hidden
          className="animate-float-slow pointer-events-none absolute -left-10 top-24 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,#e9e9df,#5c5d50)] opacity-20 blur-[1px]"
        />
        <div
          aria-hidden
          className="animate-float-slow pointer-events-none absolute right-10 bottom-16 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,#f2c200,#7a6300)] opacity-25 blur-[1px] [animation-delay:-4s]"
        />

        <div className="container-x relative grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow text-gold">Global Presence</span>
            </Reveal>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              A global footprint
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-cream/70">
                From our base in Vilnius, we allocate capital across
                international markets — pursuing opportunities wherever our
                insight and discipline can compound enduring value.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <WorldMap />
          </Reveal>
        </div>
      </section>

      {/* Allocation */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid items-center gap-16 md:grid-cols-2">
          <Reveal direction="right">
            <div className="mx-auto flex max-w-sm items-center justify-center">
              <div
                className="relative aspect-square w-full rounded-full"
                style={{ background: `conic-gradient(${stops})` }}
              >
                <div className="absolute inset-[22%] grid place-items-center rounded-full bg-cream text-center shadow-inner">
                  <div>
                    <div className="font-display text-4xl font-extrabold tracking-tight text-ink">
                      4
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                      Asset classes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow text-muted">Target Allocation</span>
            </Reveal>
            <div className="mt-8 space-y-7">
              {allocations.map((a, i) => (
                <Reveal key={a.label} delay={i * 0.08}>
                  <div>
                    <div className="flex items-end justify-between">
                      <span className="flex items-center gap-3 font-display text-lg font-bold tracking-tight text-ink">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: SEGMENT_COLORS[i] }}
                        />
                        {a.label}
                      </span>
                      <span className="font-display text-xl font-extrabold text-olive">
                        <Counter value={a.value} suffix="%" />
                      </span>
                    </div>
                    <GrowBar value={a.value} className="mt-3" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="grain bg-noir py-24 text-cream md:py-28">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow text-gold">Our Approach</span>
          </Reveal>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {APPROACH.map((a) => (
              <StaggerItem
                key={a.title}
                className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-8"
              >
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/60">
                  {a.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Portal CTA */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl bg-noir px-8 py-16 text-cream md:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(242,194,0,0.18),transparent_60%)] blur-2xl"
              />
              <div className="relative max-w-2xl">
                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                  {c["investments.cta.title"]}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-cream/70">
                  {c["investments.cta.body"]}
                </p>
                <ButtonLink href="/portal" variant="light" className="mt-8">
                  <Lock className="h-4 w-4" />
                  Private Client Portal
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
