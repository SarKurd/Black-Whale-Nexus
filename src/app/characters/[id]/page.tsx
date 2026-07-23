import { CharacterDossier } from "@/components/dossier/CharacterDossier";
import { characters } from "@/data/characters";

export function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export default async function CharacterPage({
  params,
}: PageProps<"/characters/[id]">) {
  const { id } = await params;
  return <CharacterDossier id={id} />;
}
