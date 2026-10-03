import type { MetadataRoute } from "next";
import {
  chapters,
  characters,
  factions,
  nenAbilities,
  princes,
  storylines,
} from "@/lib/db";
import {
  abilitySeo,
  absoluteUrl,
  characterSeo,
  type SeoPage,
  SITE_LAST_MODIFIED,
  STATIC_PAGE_SEO,
} from "@/lib/seo";

export const dynamic = "force-static";

const isIndexable = (page: SeoPage) => page.indexable !== false;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = Object.values(STATIC_PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: SITE_LAST_MODIFIED,
  }));

  const detailPages = [
    ...characters
      .map(characterSeo)
      .filter(isIndexable)
      .map((page) => page.path),
    ...princes.map((prince) => `/princes/${prince.id}`),
    ...factions.map((faction) => `/factions/${faction.id}`),
    ...nenAbilities
      .map(abilitySeo)
      .filter(isIndexable)
      .map((page) => page.path),
    ...storylines.map((storyline) => `/storylines/${storyline.id}`),
    ...chapters.map((chapter) => `/chapters/${chapter.number}`),
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: SITE_LAST_MODIFIED,
  }));

  return [...staticPages, ...detailPages];
}
