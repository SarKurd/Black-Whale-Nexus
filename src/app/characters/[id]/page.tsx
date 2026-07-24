import type { Metadata } from "next";
import { CharacterDossier } from "@/components/dossier/CharacterDossier";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { characters } from "@/data/characters";
import {
  characterSeo,
  createPageMetadata,
  missingRecordMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/characters/[id]">): Promise<Metadata> {
  const { id } = await params;
  const character = characters.find((item) => item.id === id);
  return character
    ? createPageMetadata(characterSeo(character))
    : missingRecordMetadata;
}

export default async function CharacterPage({
  params,
}: PageProps<"/characters/[id]">) {
  const { id } = await params;
  const character = characters.find((item) => item.id === id);

  return (
    <>
      {character && <PageStructuredData page={characterSeo(character)} />}
      <CharacterDossier id={id} />
    </>
  );
}
