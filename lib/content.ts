/**
 * Single source of truth for all editable site copy.
 *
 * Every field below can be overridden from the CMS (/admin/content). The
 * public pages read the merged result via getContent() (lib/content-server.ts);
 * the admin editor reads `contentSchema` to render its form. Keeping the
 * defaults here means the site renders perfectly even before the database is
 * seeded.
 */

export type ContentMap = Record<string, string>;

export interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea";
  default: string;
}

export interface ContentSection {
  id: string;
  title: string;
  fields: ContentField[];
}

const t = (key: string, label: string, def: string): ContentField => ({
  key,
  label,
  type: "text",
  default: def,
});

const a = (key: string, label: string, def: string): ContentField => ({
  key,
  label,
  type: "textarea",
  default: def,
});

export const contentSchema: ContentSection[] = [
  {
    id: "brand",
    title: "Brand & Footer",
    fields: [
      t("brand.name", "Company name", "P&J Asset Management"),
      t("brand.short", "Short name", "P&J"),
      t("brand.tagline", "Tagline", "Diversified Investment Firm"),
      a(
        "footer.blurb",
        "Footer blurb",
        "A diversified investment firm focused on real estate, private enterprise, and strategic ventures — building lasting value through disciplined, long-term investing.",
      ),
      t("footer.copyright", "Footer copyright", "© 2025 P&J Asset Management"),
      t("footer.builtBy", "Built-by credit", "Data Innovations"),
    ],
  },
  {
    id: "home-hero",
    title: "Home · Hero",
    fields: [
      t("home.hero.titleTop", "Headline line 1", "Invest in"),
      t("home.hero.titleBottom", "Headline line 2", "Your Future"),
      a(
        "home.hero.subtitle",
        "Sub-headline",
        "Disciplined, long-term capital allocation across real estate, private enterprise, and global markets.",
      ),
      t("home.hero.ctaPrimary", "Primary button", "Explore our strategy"),
      t("home.hero.ctaSecondary", "Secondary button", "Get in touch"),
    ],
  },
  {
    id: "home-strategies",
    title: "Home · Investment Strategies",
    fields: [
      t("home.strategies.eyebrow", "Eyebrow label", "01 — Overview"),
      t("home.strategies.titleTop", "Heading line 1", "Our Investment"),
      t("home.strategies.titleBottom", "Heading line 2", "Strategies"),
      a(
        "home.strategies.body",
        "Body",
        "P&J Asset Management is a diversified investment firm with a strong focus on real estate, private enterprises, and strategic ventures across various industries. Our approach combines deep market insight, disciplined execution, and long-term vision to create sustainable value. We are committed to identifying high-potential opportunities and managing them with precision to ensure consistent growth and superior returns. Our strategy is driven by one goal — to execute every investment successfully and exceed the expectations of our partners and stakeholders.",
      ),
      t("home.strategies.link", "Link label", "Discover our approach"),
    ],
  },
  {
    id: "home-stats",
    title: "Home · Stats band",
    fields: [
      t("home.stats.s1v", "Stat 1 value", "2021"),
      t("home.stats.s1l", "Stat 1 label", "Founded"),
      t("home.stats.s2v", "Stat 2 value", "4"),
      t("home.stats.s2l", "Stat 2 label", "Core asset classes"),
      t("home.stats.s3v", "Stat 3 value", "6-figure+"),
      t("home.stats.s3l", "Stat 3 label", "Capital deployed"),
      t("home.stats.s4v", "Stat 4 value", "100%"),
      t("home.stats.s4l", "Stat 4 label", "Independent capital"),
    ],
  },
  {
    id: "home-responsible",
    title: "Home · Responsible Investment",
    fields: [
      t("home.responsible.eyebrow", "Eyebrow label", "02 — Philosophy"),
      t("home.responsible.titleTop", "Heading line 1", "Committed to"),
      t(
        "home.responsible.titleBottom",
        "Heading line 2",
        "Responsible Investment",
      ),
      a(
        "home.responsible.body",
        "Body",
        "P&J Asset Management approaches every investment opportunity with meticulous precision and a data-driven mindset. Each potential venture is evaluated through rigorous financial analysis, strategic foresight, and comprehensive risk assessment to ensure sustainable performance and optimal returns. Our philosophy is built on disciplined decision-making and a deep understanding of market dynamics. By blending analytical expertise with prudent risk management, we strive to maximize value creation while maintaining stability and minimizing exposure to uncertainty.",
      ),
    ],
  },
  {
    id: "home-origins",
    title: "Home · Origins",
    fields: [
      t("home.origins.eyebrow", "Eyebrow label", "03 — Our Story"),
      t("home.origins.watermark", "Background number", "2021"),
      t("home.origins.title", "Heading", "The Origins of Excellence"),
      a(
        "home.origins.body",
        "Body",
        "Our journey began in 2021, when two brothers set out to build something greater — a lasting legacy that creates meaningful value for the world. What started as a shared passion for investing soon evolved into a diversified portfolio spanning equities, bonds, real estate, and enterprise development. Since then, our investments have grown substantially, exceeding six figures — achieved entirely through independent capital and strategic vision.",
      ),
      t("home.origins.link", "Button label", "Read our story"),
    ],
  },
  {
    id: "home-partnership",
    title: "Home · Strategic Partnership",
    fields: [
      t("home.partnership.eyebrow", "Eyebrow label", "04 — Partnership"),
      t("home.partnership.title", "Heading", "Strategic Partnership"),
      a(
        "home.partnership.body",
        "Body",
        "We build enduring relationships with visionary partners who share our commitment to excellence and long-term value creation.",
      ),
      t("home.partnership.partnerLabel", "Partner label", "Technology Partner"),
      t("home.partnership.partnerName", "Partner name", "Data Innovations"),
    ],
  },
  {
    id: "home-cta",
    title: "Home · Closing call-to-action",
    fields: [
      t("home.cta.title", "Heading", "Ready to invest in your future?"),
      t("home.cta.button", "Button label", "Get in touch"),
    ],
  },
  {
    id: "about-hero",
    title: "About · Hero",
    fields: [
      t("about.hero.titleTop", "Headline line 1", "About"),
      t("about.hero.titleBottom", "Headline line 2", "Us"),
    ],
  },
  {
    id: "about-intro",
    title: "About · Story",
    fields: [
      a(
        "about.intro.body1",
        "Paragraph 1",
        "Our story began in 2021, when two brothers shared a vision to build something greater — a lasting legacy that creates meaningful and sustainable value for the future. What started as a shared passion for investing soon evolved into a diversified investment firm with a global outlook and a growing portfolio spanning equities, bonds, real estate, and enterprise development.",
      ),
      a(
        "about.intro.body2",
        "Paragraph 2",
        "From the very beginning, our journey has been guided by independence, discipline, and an unwavering commitment to long-term growth. Every milestone has been achieved through our own capital, strategic foresight, and a deep understanding of market dynamics. This independence defines who we are — a firm built on trust, ambition, and integrity.",
      ),
      a(
        "about.intro.body3",
        "Paragraph 3",
        "Today, our investments have expanded well beyond six figures, reflecting years of dedication, research, and a clear focus on sustainable value creation. Yet, this is only the beginning of our story — a continuing pursuit of excellence and a vision to shape opportunities that stand the test of time.",
      ),
    ],
  },
  {
    id: "about-values",
    title: "About · Values",
    fields: [
      t("about.values.v1t", "Value 1 title", "Independence"),
      a(
        "about.values.v1b",
        "Value 1 body",
        "Every milestone achieved through our own capital and conviction.",
      ),
      t("about.values.v2t", "Value 2 title", "Discipline"),
      a(
        "about.values.v2b",
        "Value 2 body",
        "Rigorous analysis and prudent risk management guide each decision.",
      ),
      t("about.values.v3t", "Value 3 title", "Long-term Vision"),
      a(
        "about.values.v3b",
        "Value 3 body",
        "We invest for durable value that stands the test of time.",
      ),
    ],
  },
  {
    id: "about-focus",
    title: "About · Industry Focus",
    fields: [
      t("about.focus.title", "Heading", "Industry Focus"),
      a(
        "about.focus.body1",
        "Paragraph 1",
        "P&J Asset Management concentrates on sectors with strong structural growth, innovation capacity, and long-term resilience. Our primary areas of focus include real estate, private enterprises, fixed income, and global equity markets.",
      ),
      a(
        "about.focus.body2",
        "Paragraph 2",
        "We pursue opportunities in industries that demonstrate enduring value and strategic importance, allocating capital where our expertise and insight can generate sustainable returns and measurable impact.",
      ),
    ],
  },
  {
    id: "about-portfolio",
    title: "About · Diverse Portfolio",
    fields: [
      t("about.portfolio.title", "Heading", "Diverse Portfolio"),
      a(
        "about.portfolio.body1",
        "Paragraph 1",
        "Our portfolio is structured to achieve balance, stability, and consistent performance across market conditions. We maintain diversified exposure through equities, bonds, real estate assets, and private investments, ensuring an optimal mix of risk and return.",
      ),
      a(
        "about.portfolio.body2",
        "Paragraph 2",
        "Each holding is selected through disciplined analysis and guided by a long-term vision, reinforcing P&J Asset Management's commitment to responsible growth and strategic excellence.",
      ),
    ],
  },
  {
    id: "strategy-hero",
    title: "Strategy · Hero",
    fields: [
      t("strategy.hero.titleTop", "Headline line 1", "Investment"),
      t("strategy.hero.titleBottom", "Headline line 2", "Strategies"),
      a(
        "strategy.intro",
        "Intro",
        "Every investment decision we make is guided by a deep understanding of market dynamics, a commitment to precision, and a focus on enduring value creation. We believe in responsible investing — managing risk, fostering innovation, and generating consistent returns for our partners and stakeholders. At P&J Asset Management, our investment strategy is built on diversification, insight, and disciplined execution. We invest across multiple asset classes — including international real estate, private enterprises, fixed income, and strategic equity positions — to capture both growth and resilience in an ever-changing global economy.",
      ),
    ],
  },
  {
    id: "strategy-pillars",
    title: "Strategy · Pillars",
    fields: [
      t("strategy.realEstate.title", "Pillar 1 title", "Real Estate"),
      a(
        "strategy.realEstate.body",
        "Pillar 1 body",
        "We invest in high-value real estate assets worldwide, focusing on projects that combine long-term stability with appreciation potential. Our portfolio includes both commercial and residential developments located in markets supported by strong demographic trends and sustainable economic growth.",
      ),
      t(
        "strategy.partnerships.title",
        "Pillar 2 title",
        "Strategic Partnerships",
      ),
      a(
        "strategy.partnerships.body",
        "Pillar 2 body",
        "We collaborate with esteemed partners and visionary enterprises to discover new ventures and expand our global investment presence. Guided by shared expertise and strategic insight, we pursue opportunities that reshape industries and generate enduring value. Each partnership embodies our dedication to excellence, precision, and the continuous pursuit of sustainable growth.",
      ),
      t("strategy.privateEquity.title", "Pillar 3 title", "Private Equity"),
      a(
        "strategy.privateEquity.body",
        "Pillar 3 body",
        "We partner with innovative private companies and strategic ventures that demonstrate strong fundamentals, clear growth potential, and the capacity to shape their industries. From early-stage enterprises to established businesses seeking expansion capital, our goal is to identify opportunities that align with our long-term vision and deliver meaningful impact.",
      ),
      t("strategy.credit.title", "Pillar 4 title", "Corporate Credit"),
      a(
        "strategy.credit.body",
        "Pillar 4 body",
        "Our approach to global markets is grounded in rigorous research, careful analysis, and disciplined allocation. Through selective bond investments and diversified international holdings, we balance performance with prudent risk management — ensuring stable and sustainable returns across market cycles.",
      ),
    ],
  },
  {
    id: "investments",
    title: "Investments",
    fields: [
      t("investments.hero.titleTop", "Headline line 1", "Our"),
      t("investments.hero.titleBottom", "Headline line 2", "Investments"),
      a(
        "investments.intro",
        "Intro",
        "A diversified portfolio engineered for balance, resilience, and long-term appreciation. We allocate capital across asset classes where our insight and discipline can compound value over time.",
      ),
      t("investments.alloc.a1l", "Allocation 1 label", "Real Estate"),
      t("investments.alloc.a1v", "Allocation 1 %", "40"),
      t("investments.alloc.a2l", "Allocation 2 label", "Private Equity"),
      t("investments.alloc.a2v", "Allocation 2 %", "25"),
      t("investments.alloc.a3l", "Allocation 3 label", "Fixed Income"),
      t("investments.alloc.a3v", "Allocation 3 %", "20"),
      t("investments.alloc.a4l", "Allocation 4 label", "Global Equities"),
      t("investments.alloc.a4v", "Allocation 4 %", "15"),
      t("investments.cta.title", "CTA title", "Invest alongside us"),
      a(
        "investments.cta.body",
        "CTA body",
        "Qualified partners can request access to our private client portal for detailed reporting and portfolio insight.",
      ),
    ],
  },
  {
    id: "contact",
    title: "Contact",
    fields: [
      t("contact.hero.title", "Heading", "Contact"),
      a(
        "contact.intro",
        "Intro",
        "Your inquiry is of great importance to us, and a dedicated member of our investment team will reach out to you personally to provide tailored guidance and insights.",
      ),
      t("contact.email", "Contact email", "contact@pjassetmanagement.com"),
      t("contact.location", "Location", "Vilnius, Lithuania"),
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    fields: [
      t("privacy.title", "Heading", "Privacy Policy"),
      t("privacy.updated", "Last updated", "Last updated: July 2026"),
      a(
        "privacy.intro",
        "Intro",
        "P&J Asset Management (\"we\", \"us\", or \"our\") respects your privacy and is committed to protecting the personal data you share with us. This policy explains what we collect, how we use it, and the rights you have over your information.",
      ),
      t("privacy.s1t", "Section 1 title", "Information We Collect"),
      a(
        "privacy.s1b",
        "Section 1 body",
        "We collect the information you provide directly to us — such as your name, email address, and the contents of any message you send through our contact form. We may also collect limited technical data, such as your browser type and IP address, to keep the site secure and functioning.",
      ),
      t("privacy.s2t", "Section 2 title", "How We Use Your Information"),
      a(
        "privacy.s2b",
        "Section 2 body",
        "We use your information to respond to your inquiries, provide the services you request, maintain and improve our website, and comply with our legal obligations. We do not sell your personal data to third parties.",
      ),
      t("privacy.s3t", "Section 3 title", "Data Sharing"),
      a(
        "privacy.s3b",
        "Section 3 body",
        "We may share information with trusted service providers who help us operate our website and communicate with you, strictly under confidentiality obligations, and with authorities where required by law.",
      ),
      t("privacy.s4t", "Section 4 title", "Data Security"),
      a(
        "privacy.s4b",
        "Section 4 body",
        "We apply appropriate technical and organisational measures to protect your data against unauthorised access, loss, or misuse. No method of transmission over the internet is entirely secure, but we work to safeguard your information at every step.",
      ),
      t("privacy.s5t", "Section 5 title", "Your Rights"),
      a(
        "privacy.s5b",
        "Section 5 body",
        "Depending on your location, you may have the right to access, correct, or delete your personal data, and to object to or restrict its processing. To exercise these rights, please contact us using the details below.",
      ),
      t("privacy.s6t", "Section 6 title", "Contact Us"),
      a(
        "privacy.s6b",
        "Section 6 body",
        "If you have any questions about this Privacy Policy or how we handle your data, please reach out to us through the contact page.",
      ),
    ],
  },
];

/** Flat map of every default value, keyed by content key. */
export const defaultContent: ContentMap = Object.fromEntries(
  contentSchema.flatMap((section) =>
    section.fields.map((field) => [field.key, field.default]),
  ),
);

/** Merge CMS overrides on top of the defaults. */
export function mergeContent(overrides: Record<string, string>): ContentMap {
  return { ...defaultContent, ...overrides };
}
