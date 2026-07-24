import { chapters } from "@/data/chapters";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ num: String(chapter.number) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const chapter = chapters.find((item) => item.number === Number(num));

  return ogCard({
    fileNo: `CH ${num}`,
    tag: "CHAPTER REPORT",
    title: chapter?.title ?? "Unknown Chapter",
    sub: chapter?.summary ?? "Classified chapter record",
  });
}
