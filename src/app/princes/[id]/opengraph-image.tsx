import { characterById, princes } from "@/lib/db";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export function generateStaticParams() {
  return princes.map((prince) => ({ id: prince.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prince = princes.find((item) => item.id === id);
  const character = prince ? characterById.get(prince.characterId) : undefined;

  return ogCard({
    fileNo: prince ? `RANK ${String(prince.rank).padStart(2, "0")}` : "RANK --",
    tag: "PRINCE OF KAKIN",
    title: character?.name ?? "Unknown Prince",
    sub: prince?.publicStrategy ?? "Classified royal record",
  });
}
