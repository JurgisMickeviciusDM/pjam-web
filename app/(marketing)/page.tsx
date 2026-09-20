import { getContent } from "@/lib/content-server";
import { getHomeLayout } from "@/lib/layout-server";
import { homeBlockComponents } from "@/components/blocks/home-blocks";

export default async function HomePage() {
  const [c, layout] = await Promise.all([getContent(), getHomeLayout()]);

  return (
    <>
      {layout
        .filter((block) => !block.hidden)
        .map((block) => {
          const Block = homeBlockComponents[block.blockId];
          return Block ? <Block key={block.blockId} c={c} /> : null;
        })}
    </>
  );
}
