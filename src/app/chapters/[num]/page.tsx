import type { Metadata } from "next";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { ChapterReport } from "@/components/story/ChapterReport";
import { chapters } from "@/lib/db";
import {
  chapterSeo,
  createPageMetadata,
  missingRecordMetadata,
} from "@/lib/seo";
import type { ChapterInfo } from "@/lib/types";

export function generateStaticParams() {
  return chapters.map((c: ChapterInfo) => ({ num: String(c.number) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/chapters/[num]">): Promise<Metadata> {
  const { num } = await params;
  const chapter = chapters.find(
    (item: ChapterInfo) => item.number === Number(num),
  );
  return chapter
    ? createPageMetadata(chapterSeo(chapter))
    : missingRecordMetadata;
}

export default async function ChapterPage({
  params,
}: PageProps<"/chapters/[num]">) {
  const { num } = await params;
  const chapter = chapters.find(
    (item: ChapterInfo) => item.number === Number(num),
  );

  return (
    <>
      {chapter && <PageStructuredData page={chapterSeo(chapter)} />}
      <ChapterReport num={num} />
    </>
  );
}
