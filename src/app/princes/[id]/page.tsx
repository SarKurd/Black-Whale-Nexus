import type { Metadata } from "next";
import { PrinceProfile } from "@/components/princes/PrinceProfile";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { characterById, princes } from "@/lib/db";
import {
  createPageMetadata,
  missingRecordMetadata,
  princeSeo,
} from "@/lib/seo";
import type { Prince } from "@/lib/types";

export function generateStaticParams() {
  return (princes as Prince[]).map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/princes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const prince = (princes as Prince[]).find((item) => item.id === id);
  const character = prince ? characterById.get(prince.characterId) : undefined;
  return prince && character
    ? createPageMetadata(princeSeo(prince, character))
    : missingRecordMetadata;
}

export default async function PrincePage({
  params,
}: PageProps<"/princes/[id]">) {
  const { id } = await params;
  const prince = (princes as Prince[]).find((item) => item.id === id);
  const character = prince ? characterById.get(prince.characterId) : undefined;

  return (
    <>
      {prince && character && (
        <PageStructuredData page={princeSeo(prince, character)} />
      )}
      <PrinceProfile id={id} />
    </>
  );
}
