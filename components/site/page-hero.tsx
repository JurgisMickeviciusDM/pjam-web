import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

interface PageHeroProps {
  eyebrow: string;
  lines: string[];
  subtitle?: string;
}

/** Shared dark hero used at the top of every interior marketing page. */
export function PageHero({ eyebrow, lines, subtitle }: PageHeroProps) {
  return (
    <section className="grain relative overflow-hidden bg-noir text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(242,194,0,0.12),transparent_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -bottom-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(215,217,202,0.08),transparent_60%)] blur-2xl"
      />
      <div className="container-x relative pt-40 pb-24 md:pt-48 md:pb-28">
        <Reveal direction="none">
          <span className="eyebrow text-gold">{eyebrow}</span>
        </Reveal>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight">
          <TextReveal lines={lines} delay={0.1} />
        </h1>
        {subtitle && (
          <Reveal delay={0.4} className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-cream/70">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
