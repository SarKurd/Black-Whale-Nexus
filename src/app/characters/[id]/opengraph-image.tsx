import { characters } from "@/data/characters";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export function generateStaticParams() {
  return characters.map((character) => ({ id: character.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = characters.find((item) => item.id === id);
  const fileNumber = character ? characters.indexOf(character) + 1 : 0;

  return ogCard({
    fileNo: `FILE ${String(fileNumber).padStart(3, "0")}`,
    tag: "CHARACTER DOSSIER",
    title: character?.name ?? "Unknown Record",
    sub: character?.role ?? "Classified character record",
  });
}
