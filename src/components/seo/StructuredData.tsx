import {
  absoluteUrl,
  type SeoPage,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be emitted as script text; JSON is serialized locally and "<" is escaped below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
      }}
    />
  );
}

export function PageStructuredData({ page }: { page: SeoPage }) {
  const breadcrumbs = [
    { name: SITE_NAME, path: "/" },
    ...(page.section ? [page.section] : []),
    ...(page.path === "/" ? [] : [{ name: page.heading, path: page.path }]),
  ];
  const pageUrl = absoluteUrl(page.path);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: page.heading,
            description: page.description,
            inLanguage: "en",
            isPartOf: {
              "@id": `${absoluteUrl("/")}#website`,
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: absoluteUrl(item.path),
            })),
          },
        ],
      }}
    />
  );
}
