import { factions } from "@/data/factions";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export function generateStaticParams() {
  return factions.map((faction) => ({ id: faction.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faction = factions.find((item) => item.id === id);
  const fileNumber = faction ? factions.indexOf(faction) + 1 : 0;

  return ogCard({
    fileNo: `FILE ${String(fileNumber).padStart(2, "0")}`,
    tag: "FACTION DOSSIER",
    title: faction?.name ?? "Unknown Faction",
    sub: faction?.summary ?? "Classified faction record",
  });
}
