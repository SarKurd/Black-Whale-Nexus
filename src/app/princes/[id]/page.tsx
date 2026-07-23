import { PrinceProfile } from "@/components/princes/PrinceProfile";
import { princes } from "@/lib/db";
import type { Prince } from "@/lib/types";

export function generateStaticParams() {
  return (princes as Prince[]).map((p) => ({ id: p.id }));
}

export default async function PrincePage({
  params,
}: PageProps<"/princes/[id]">) {
  const { id } = await params;
  return <PrinceProfile id={id} />;
}
