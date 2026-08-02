import type { Metadata } from "next";
import { Building2, Handshake, TrendingUp, Landmark } from "lucide-react";
import { getContent } from "@/lib/content-server";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Strategy" };

export default async function StrategyPage() {
  const c = await getContent();

  const pillars = [
    {
      icon: Building2,
      title: c["strategy.realEstate.title"],
      body: c["strategy.realEstate.body"],
    },
    {
      icon: Handshake,
      title: c["strategy.partnerships.title"],
      body: c["strategy.partnerships.body"],
    },
    {
      icon: TrendingUp,
      title: c["strategy.privateEquity.title"],
      body: c["strategy.privateEquity.body"],
    },
    {
      icon: Landmark,
      title: c["strategy.credit.title"],
      body: c["strategy.credit.body"],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="How We Invest"
        lines={[c["strategy.hero.titleTop"], c["strategy.hero.titleBottom"]]}
      />

      {/* Intro */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="text-xl leading-relaxed text-olive/85 md:text-2xl md:leading-relaxed">
              {c["strategy.intro"]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-sand pb-24 md:pb-32">
        <div className="container-x space-y-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} direction={i % 2 === 0 ? "up" : "up"} delay={0.05}>
                <article
                  className={cn(
                    "group grid items-start gap-6 rounded-3xl border border-ink/10 bg-cream p-8 transition-colors hover:border-ink/25 md:grid-cols-12 md:gap-10 md:p-12",
                  )}
                >
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-5xl font-extrabold tracking-tight text-ink/15">
                        0{i + 1}
                      </span>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-olive text-cream transition-colors group-hover:bg-gold group-hover:text-ink">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink">
                      {p.title}
                    </h2>
                  </div>
                  <div className="md:col-span-8 md:pt-2">
                    <p className="text-lg leading-relaxed text-olive/80">
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-noir py-24 text-cream md:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Explore how these strategies shape our portfolio.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ButtonLink href="/investments" variant="light" withArrow>
              View Investments
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
