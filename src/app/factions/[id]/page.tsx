import { FactionFile } from "@/components/factions/FactionFile";
import { factions } from "@/lib/db";
import type { Faction } from "@/lib/types";

export function generateStaticParams() {
  return (factions as Faction[]).map((f) => ({ id: f.id }));
}

export default async function FactionPage({
  params,
}: PageProps<"/factions/[id]">) {
  const { id } = await params;
  return <FactionFile id={id} />;
}
