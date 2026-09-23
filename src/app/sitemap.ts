import type { MetadataRoute } from "next";
import {
  chapters,
  characters,
  factions,
  nenAbilities,
  princes,
  storylines,
} from "@/lib/db";
import { absoluteUrl, SITE_LAST_MODIFIED, STATIC_PAGE_SEO } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = Object.values(STATIC_PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: SITE_LAST_MODIFIED,
  }));

  const detailPages = [
    ...characters.map((character) => `/characters/${character.id}`),
    ...princes.map((prince) => `/princes/${prince.id}`),
    ...factions.map((faction) => `/factions/${faction.id}`),
    ...nenAbilities.map((ability) => `/nen/${ability.id}`),
    ...storylines.map((storyline) => `/storylines/${storyline.id}`),
    ...chapters.map((chapter) => `/chapters/${chapter.number}`),
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: SITE_LAST_MODIFIED,
  }));

  return [...staticPages, ...detailPages];
}
