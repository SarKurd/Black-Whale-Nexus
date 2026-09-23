import type { Metadata } from "next";
import { StaticPageStructuredData } from "@/components/seo/StaticPageStructuredData";
import { createPageMetadata, STATIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(STATIC_PAGE_SEO["/web"]);

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StaticPageStructuredData page={STATIC_PAGE_SEO["/web"]} />
      {children}
    </>
  );
}
