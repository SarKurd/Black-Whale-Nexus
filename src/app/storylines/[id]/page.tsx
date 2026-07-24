import type { Metadata } from "next";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { StorylineFile } from "@/components/story/StorylineFile";
import { storylines } from "@/lib/db";
import {
  createPageMetadata,
  missingRecordMetadata,
  storylineSeo,
} from "@/lib/seo";
import type { Storyline } from "@/lib/types";

export function generateStaticParams() {
  return storylines.map((s: Storyline) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/storylines/[id]">): Promise<Metadata> {
  const { id } = await params;
  const storyline = storylines.find((item: Storyline) => item.id === id);
  return storyline
    ? createPageMetadata(storylineSeo(storyline))
    : missingRecordMetadata;
}

export default async function StorylinePage({
  params,
}: PageProps<"/storylines/[id]">) {
  const { id } = await params;
  const storyline = storylines.find((item: Storyline) => item.id === id);

  return (
    <>
      {storyline && <PageStructuredData page={storylineSeo(storyline)} />}
      <StorylineFile id={id} />
    </>
  );
}
