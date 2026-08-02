import type { Metadata } from "next";
import { getContent } from "@/lib/content-server";
import { PageHero } from "@/components/site/page-hero";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "About" };

const SECTORS = [
  "Real Estate",
  "Private Enterprises",
  "Fixed Income",
  "Global Equity Markets",
];

const ALLOCATIONS = [
  { label: "Equities", value: 30 },
  { label: "Real Estate", value: 30 },
  { label: "Private Investments", value: 25 },
  { label: "Bonds", value: 15 },
];

export default async function AboutPage() {
  const c = await getContent();

  return (
    <>
      <PageHero eyebrow="Who We Are" lines={[c["about.hero.titleTop"], c["about.hero.titleBottom"]]} />

      {/* Story */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <span className="eyebrow text-muted">Our Story</span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-ink">
                A lasting legacy, built on independence and discipline.
              </p>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-olive/80">
            {[c["about.intro.body1"], c["about.intro.body2"], c["about.intro.body3"]].map(
              (para, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p>{para}</p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-olive py-24 text-cream md:py-28">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow text-gold">What Guides Us</span>
          </Reveal>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [c["about.values.v1t"], c["about.values.v1b"]],
              [c["about.values.v2t"], c["about.values.v2b"]],
              [c["about.values.v3t"], c["about.values.v3b"]],
            ].map(([title, body], i) => (
              <StaggerItem
                key={i}
                className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-8"
              >
                <div className="font-display text-3xl font-extrabold text-gold">
                  0{i + 1}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Industry focus */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow text-muted">Where We Invest</span>
            </Reveal>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
              <TextReveal lines={[c["about.focus.title"]]} />
            </h2>
            <Stagger className="mt-8 flex flex-wrap gap-3">
              {SECTORS.map((s) => (
                <StaggerItem key={s}>
                  <span className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-olive">
                    {s}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="flex flex-col justify-center space-y-6 text-lg leading-relaxed text-olive/80">
            <Reveal delay={0.1}>
              <p>{c["about.focus.body1"]}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>{c["about.focus.body2"]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Diverse portfolio */}
      <section className="bg-sage py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center space-y-6 text-lg leading-relaxed text-olive/85">
            <Reveal>
              <span className="eyebrow text-olive/60">Balance & Stability</span>
            </Reveal>
            <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
              <TextReveal lines={[c["about.portfolio.title"]]} />
            </h2>
            <Reveal delay={0.1}>
              <p>{c["about.portfolio.body1"]}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>{c["about.portfolio.body2"]}</p>
            </Reveal>
          </div>

          {/* Allocation bars */}
          <Reveal direction="left" className="flex flex-col justify-center">
            <div className="rounded-2xl border border-olive/10 bg-cream p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Illustrative allocation
              </div>
              <div className="mt-8 space-y-6">
                {ALLOCATIONS.map((a) => (
                  <div key={a.label}>
                    <div className="flex items-center justify-between text-sm font-medium text-olive">
                      <span>{a.label}</span>
                      <span>{a.value}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-olive/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-olive to-navy"
                        style={{ width: `${a.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-noir py-24 text-cream md:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Discover the strategies behind the portfolio.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ButtonLink href="/strategy" variant="light" withArrow>
              Our Strategy
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
