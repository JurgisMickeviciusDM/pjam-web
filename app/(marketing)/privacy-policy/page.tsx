import type { Metadata } from "next";
import { getContent } from "@/lib/content-server";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const c = await getContent();

  const sections = [
    [c["privacy.s1t"], c["privacy.s1b"]],
    [c["privacy.s2t"], c["privacy.s2b"]],
    [c["privacy.s3t"], c["privacy.s3b"]],
    [c["privacy.s4t"], c["privacy.s4b"]],
    [c["privacy.s5t"], c["privacy.s5b"]],
    [c["privacy.s6t"], c["privacy.s6b"]],
  ];

  return (
    <>
      <PageHero eyebrow={c["privacy.updated"]} lines={[c["privacy.title"]]} />

      <section className="bg-cream py-24 md:py-28">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-olive/85">
              {c["privacy.intro"]}
            </p>
          </Reveal>

          <div className="mt-12 space-y-12">
            {sections.map(([title, body], i) => (
              <Reveal key={i} delay={0.05}>
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                    {title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-olive/80">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
