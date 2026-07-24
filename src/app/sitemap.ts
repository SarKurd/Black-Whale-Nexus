import type { MetadataRoute } from "next";
import {
  chapters,
  characters,
  factions,
  nenAbilities,
  princes,
  storylines,
} from "@/lib/db";
import { absoluteUrl, STATIC_PAGE_SEO } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = Object.values(STATIC_PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: "weekly" as const,
    priority: page.path === "/" ? 1 : 0.8,
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
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...detailPages];
}
