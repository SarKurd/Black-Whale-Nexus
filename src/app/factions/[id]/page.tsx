import type { Metadata } from "next";
import { FactionFile } from "@/components/factions/FactionFile";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { factions } from "@/lib/db";
import {
  createPageMetadata,
  factionSeo,
  missingRecordMetadata,
} from "@/lib/seo";
import type { Faction } from "@/lib/types";

export function generateStaticParams() {
  return (factions as Faction[]).map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/factions/[id]">): Promise<Metadata> {
  const { id } = await params;
  const faction = (factions as Faction[]).find((item) => item.id === id);
  return faction
    ? createPageMetadata(factionSeo(faction))
    : missingRecordMetadata;
}

export default async function FactionPage({
  params,
}: PageProps<"/factions/[id]">) {
  const { id } = await params;
  const faction = (factions as Faction[]).find((item) => item.id === id);

  return (
    <>
      {faction && <PageStructuredData page={factionSeo(faction)} />}
      <FactionFile id={id} />
    </>
  );
}
