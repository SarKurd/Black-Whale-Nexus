import { nenAbilities } from "@/data/nen";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export function generateStaticParams() {
  return nenAbilities.map((ability) => ({ id: ability.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ability = nenAbilities.find((item) => item.id === id);

  return ogCard({
    fileNo: ability?.nenType.toUpperCase() ?? "UNKNOWN",
    tag: "NEN ABILITY",
    title: ability?.name ?? "Unknown Ability",
    sub: ability?.description ?? "Classified Nen record",
  });
}
