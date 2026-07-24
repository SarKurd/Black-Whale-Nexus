import type { Metadata } from "next";
import { createPageMetadata, STATIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  STATIC_PAGE_SEO["/theories"],
);

export default function TheoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
