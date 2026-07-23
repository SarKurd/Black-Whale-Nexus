import { ChapterReport } from "@/components/story/ChapterReport";
import { chapters } from "@/lib/db";
import type { ChapterInfo } from "@/lib/types";

export function generateStaticParams() {
  return chapters.map((c: ChapterInfo) => ({ num: String(c.number) }));
}

export default async function ChapterPage({
  params,
}: PageProps<"/chapters/[num]">) {
  const { num } = await params;
  return <ChapterReport num={num} />;
}
