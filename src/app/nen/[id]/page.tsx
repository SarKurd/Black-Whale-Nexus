import { AbilityFile } from "@/components/nen/AbilityFile";
import { nenAbilities } from "@/lib/db";
import type { NenAbility } from "@/lib/types";

export function generateStaticParams() {
  // Pin the element type — @/data/nen is authored in parallel.
  return (nenAbilities as NenAbility[]).map((a) => ({ id: a.id }));
}

export default async function AbilityPage({ params }: PageProps<"/nen/[id]">) {
  const { id } = await params;
  return <AbilityFile id={id} />;
}
