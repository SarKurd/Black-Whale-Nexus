import type { Metadata } from "next";
import { AbilityFile } from "@/components/nen/AbilityFile";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { nenAbilities } from "@/lib/db";
import {
  abilitySeo,
  createPageMetadata,
  missingRecordMetadata,
} from "@/lib/seo";
import type { NenAbility } from "@/lib/types";

export function generateStaticParams() {
  // Pin the element type — @/data/nen is authored in parallel.
  return (nenAbilities as NenAbility[]).map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/nen/[id]">): Promise<Metadata> {
  const { id } = await params;
  const ability = (nenAbilities as NenAbility[]).find((item) => item.id === id);
  return ability
    ? createPageMetadata(abilitySeo(ability))
    : missingRecordMetadata;
}

export default async function AbilityPage({ params }: PageProps<"/nen/[id]">) {
  const { id } = await params;
  const ability = (nenAbilities as NenAbility[]).find((item) => item.id === id);

  return (
    <>
      {ability && <PageStructuredData page={abilitySeo(ability)} />}
      <AbilityFile id={id} />
    </>
  );
}
