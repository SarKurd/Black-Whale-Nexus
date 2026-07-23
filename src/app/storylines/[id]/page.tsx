import { StorylineFile } from "@/components/story/StorylineFile";
import { storylines } from "@/lib/db";
import type { Storyline } from "@/lib/types";

export function generateStaticParams() {
  return storylines.map((s: Storyline) => ({ id: s.id }));
}

export default async function StorylinePage({
  params,
}: PageProps<"/storylines/[id]">) {
  const { id } = await params;
  return <StorylineFile id={id} />;
}
