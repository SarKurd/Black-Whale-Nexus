import type { Metadata } from "next";
import { StaticPageStructuredData } from "@/components/seo/StaticPageStructuredData";
import { createPageMetadata, STATIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  STATIC_PAGE_SEO["/chronology"],
);

export default function ChronologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StaticPageStructuredData page={STATIC_PAGE_SEO["/chronology"]} />
      {children}
    </>
  );
}
