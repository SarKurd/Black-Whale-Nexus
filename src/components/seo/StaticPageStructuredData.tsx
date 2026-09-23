"use client";

import { usePathname } from "next/navigation";
import { PageStructuredData } from "@/components/seo/StructuredData";
import type { SeoPage } from "@/lib/seo";

/**
 * Section layouts also wrap their detail routes. Only emit the collection
 * page's JSON-LD when the current URL is the collection page itself.
 */
export function StaticPageStructuredData({ page }: { page: SeoPage }) {
  const pathname = usePathname();
  return pathname === page.path ? <PageStructuredData page={page} /> : null;
}
