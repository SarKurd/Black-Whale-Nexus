import { storylines } from "@/data/storylines";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export function generateStaticParams() {
  return storylines.map((storyline) => ({ id: storyline.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storyline = storylines.find((item) => item.id === id);
  const fileNumber = storyline ? storylines.indexOf(storyline) + 1 : 0;

  return ogCard({
    fileNo: `FILE ${String(fileNumber).padStart(2, "0")}`,
    tag: "STORYLINE",
    title: storyline?.name ?? "Unknown Storyline",
    sub: storyline?.summary ?? "Classified storyline record",
  });
}
