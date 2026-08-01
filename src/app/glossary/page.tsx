"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  SectionHeading,
} from "@/components/ui/kit";
import { characters } from "@/data/characters";
import { factions } from "@/data/factions";
import { glossary } from "@/data/glossary";
import { locations } from "@/data/locations";
import { nenAbilities } from "@/data/nen";
import { useEffectiveChapter } from "@/lib/store";
import type { GlossaryTerm } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

// Typed alias — the data module is authored in parallel, so the raw export
// may be error-typed until it lands. This cast is a no-op once it exists.
const glossaryTerms = glossary as GlossaryTerm[];
const characterById = new Map(
  characters.map((character) => [character.id, character]),
);
const factionById = new Map(factions.map((faction) => [faction.id, faction]));
const locationById = new Map(
  locations.map((location) => [location.id, location]),
);
const abilityById = new Map(
  nenAbilities.map((ability) => [ability.id, ability]),
);

const CATEGORY_ORDER: GlossaryTerm["category"][] = [
  "nen",
  "kakin",
  "ship",
  "mafia",
  "hunter",
  "arc",
];

const CATEGORY_LABEL: Record<GlossaryTerm["category"], string> = {
  nen: "Nen & abilities",
  kakin: "Kingdom of Kakin",
  ship: "The Black Whale",
  mafia: "Mafia syndicates",
  hunter: "Hunter Association",
  arc: "Succession war",
};

const glossaryTermIds = new Set(glossaryTerms.map((t) => t.id));

/** Cross-references stay spoiler-safe: hide links to entities not yet introduced. */
function relatedVisible(id: string, ch: number): boolean {
  const c = characterById.get(id);
  if (c) return c.introducedCh <= ch;
  const f = factionById.get(id);
  if (f) return f.introducedCh <= ch;
  const l = locationById.get(id);
  if (l) return l.introducedCh <= ch;
  const a = abilityById.get(id);
  if (a) return a.revealCh <= ch;
  if (glossaryTermIds.has(id)) {
    return (glossaryTerms.find((t) => t.id === id)?.introducedCh ?? 0) <= ch;
  }
  return true;
}

export default function GlossaryPage() {
  const ch = useEffectiveChapter();
  const [query, setQuery] = useUrlString("q", "");

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = glossaryTerms.filter(
      (t) => t.introducedCh <= ch && (!q || t.term.toLowerCase().includes(q)),
    );
    return CATEGORY_ORDER.map((category) => ({
      category,
      terms: visible
        .filter((t) => t.category === category)
        .sort((a, b) => a.term.localeCompare(b.term)),
    })).filter((s) => s.terms.length > 0);
  }, [ch, query]);

  const total = sections.reduce((n, s) => n + s.terms.length, 0);

  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Reference · Codex</div>
        <h1 className="royal-heading text-3xl">Glossary</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Working vocabulary of the succession war. Terms the story has not yet
          introduced at chapter {ch} are withheld.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter glossary terms"
          placeholder="Quick filter A–Z…"
          className="w-64 border border-line bg-panel px-3 py-1.5 text-sm text-ivory outline-none placeholder:text-faint focus:border-gold-line"
        />
        <span className="ml-auto font-mono text-[10px] tracking-widest text-faint">
          {total} terms on record
        </span>
      </div>

      {sections.length === 0 ? (
        <ArchiveNote>
          No codex entries match at this clearance. Raise clearance or clear the
          filter.
        </ArchiveNote>
      ) : (
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <section key={section.category}>
              <SectionHeading
                right={
                  <span className="font-mono text-[10px] tracking-widest text-faint">
                    {section.terms.length} terms
                  </span>
                }
              >
                {CATEGORY_LABEL[section.category]}
              </SectionHeading>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {section.terms.map((t, i) => (
                  <TermCard
                    key={t.id}
                    term={t}
                    ch={ch}
                    index={i}
                    animateEntrance={sectionIndex === 0 && i < 12}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function TermCard({
  term,
  ch,
  index,
  animateEntrance,
}: {
  term: GlossaryTerm;
  ch: number;
  index: number;
  animateEntrance: boolean;
}) {
  const related = (term.relatedIds ?? []).filter((id) =>
    relatedVisible(id, ch),
  );

  return (
    <motion.div
      id={term.id}
      initial={animateEntrance ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index, 10) * 0.03 }}
      className="dossier corner-ticks scroll-mt-24 p-3.5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="royal-heading text-base text-ivory">{term.term}</span>
        <ChapterRef ch={term.introducedCh} />
      </div>
      <p className="mt-1 text-sm leading-relaxed text-parchment">
        {term.definition}
      </p>
      {related.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line/60 pt-2 text-xs">
          <span className="intel-label">See also</span>
          {related.map((id) =>
            glossaryTermIds.has(id) ? (
              <Link
                key={id}
                href={`#${id}`}
                className="text-teal underline decoration-dotted underline-offset-2 hover:text-gold-bright hover:decoration-solid"
              >
                {glossaryTerms.find((g) => g.id === id)?.term ?? id}
              </Link>
            ) : (
              <EntityLink key={id} id={id} className="text-xs" />
            ),
          )}
        </div>
      )}
    </motion.div>
  );
}
