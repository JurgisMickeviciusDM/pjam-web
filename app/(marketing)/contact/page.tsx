import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { getContent } from "@/lib/content-server";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const c = await getContent();

  return (
    <>
      <PageHero eyebrow="Get in Touch" lines={[c["contact.hero.title"]]} />

      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: intro + details */}
          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-olive/85">
                {c["contact.intro"]}
              </p>
            </Reveal>

            <div className="mt-12 space-y-6">
              <Reveal delay={0.1}>
                <a
                  href={`mailto:${c["contact.email"]}`}
                  className="group flex items-center gap-4"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-olive transition-colors group-hover:border-gold group-hover:text-gold">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Email
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight text-ink">
                      {c["contact.email"]}
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-olive">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Location
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight text-ink">
                      {c["contact.location"]}
                    </span>
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <a
                  href="https://www.linkedin.com/company/p-j-asset-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-olive transition-colors group-hover:border-gold group-hover:text-gold">
                    <LinkedInIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Follow
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight text-ink">
                      LinkedIn
                    </span>
                  </span>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right: form */}
          <Reveal direction="left" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
