"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArchiveNote,
  OrderToggle,
  SectionHeading,
  type SortDirection,
} from "@/components/ui/kit";
import { chapters } from "@/data/chapters";
import { storylines } from "@/data/storylines";
import { useEffectiveChapter } from "@/lib/store";
import type { ChapterInfo } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
const storylineById = new Map(
  storylines.map((storyline) => [storyline.id, storyline]),
);

export default function ChaptersIndexPage() {
  const ch = useEffectiveChapter();
  const [order, setOrder] = useUrlString(
    "order",
    "asc",
    (value) => value === "asc" || value === "desc",
  );
  const chronology = order as SortDirection;

  const { open, sealed } = useMemo(() => {
    const covered: ChapterInfo[] = [...sortedChapters].sort((a, b) =>
      chronology === "desc" ? b.number - a.number : a.number - b.number,
    );
    return {
      open: covered.filter((c) => c.number <= ch),
      sealed: covered.filter((c) => c.number > ch),
    };
  }, [ch, chronology]);

  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Incident reports</div>
        <h1 className="royal-heading text-3xl">Chapter Archive</h1>
        <p className="mt-1 max-w-2xl text-xs text-muted">
          Filed reports for every covered chapter of the voyage. Reports above
          your clearance stay sealed — not even their titles are written out.
        </p>
      </div>

      <div className="mb-4 flex justify-end">
        <OrderToggle direction={chronology} onChange={setOrder} />
      </div>

      {open.length === 0 ? (
        <ArchiveNote>
          No reports are open at this clearance. Raise clearance to begin
          reading the record.
        </ArchiveNote>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {open.map((c) => {
            const deaths = c.changes.deaths?.length ?? 0;
            const mysteriesIntroduced =
              c.changes.mysteriesIntroduced?.length ?? 0;
            return (
              <Link
                key={c.number}
                href={`/chapters/${c.number}`}
                className="archive-collection-card dossier corner-ticks group flex flex-col p-4 transition-colors hover:border-gold-line"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-2xl tracking-widest text-gold">
                    {c.number}
                  </span>
                  {c.day && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      Day {c.day}
                    </span>
                  )}
                </div>
                <div className="royal-heading mt-1 text-base text-ivory group-hover:text-gold-bright">
                  {c.title}
                </div>
                <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">
                  {c.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line/60 pt-2 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-muted">
                    {c.eventIds.length} event
                    {c.eventIds.length === 1 ? "" : "s"}
                  </span>
                  <span
                    style={{
                      color: deaths > 0 ? "var(--blood)" : "var(--faint)",
                    }}
                  >
                    {deaths} death{deaths === 1 ? "" : "s"}
                  </span>
                  <span
                    style={{
                      color:
                        mysteriesIntroduced > 0
                          ? "var(--gold)"
                          : "var(--faint)",
                    }}
                  >
                    {mysteriesIntroduced} myster
                    {mysteriesIntroduced === 1 ? "y" : "ies"}
                  </span>
                </div>

                {c.storylineIds.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {c.storylineIds.map((sid) => {
                      const s = storylineById.get(sid);
                      if (!s) return null;
                      return (
                        <span
                          key={sid}
                          className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted"
                        >
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: s.color }}
                          />
                          {s.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {sealed.length > 0 && (
        <div className="mt-8">
          <SectionHeading
            right={
              <span className="font-mono text-[10px] tracking-widest text-faint">
                {sealed.length} sealed
              </span>
            }
          >
            Beyond clearance
          </SectionHeading>
          <div className="space-y-1.5">
            {sealed.map((c) => (
              <div
                key={c.number}
                className="flex items-center gap-4 border border-dashed border-line px-4 py-2.5 opacity-70"
              >
                <span className="font-mono text-lg tracking-widest text-faint">
                  {c.number}
                </span>
                <span className="stamp text-[10px] text-warn">
                  Report sealed
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  raise clearance to open
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
