import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollProgressBar } from "@/components/motion/scroll-progress";
import { getContent } from "@/lib/content-server";

// Marketing pages read CMS content from the database on each request so
// edits publish instantly.
export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main id="main">{children}</main>
      <Footer content={content} />
    </>
  );
}
