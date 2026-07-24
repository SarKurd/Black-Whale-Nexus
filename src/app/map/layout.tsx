import type { Metadata } from "next";
import { createPageMetadata, STATIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(STATIC_PAGE_SEO["/map"]);

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
