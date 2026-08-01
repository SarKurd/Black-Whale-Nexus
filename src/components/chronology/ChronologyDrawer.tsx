"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { EventKindChip } from "@/components/story/EventRecorder";
import {
  ChapterRef,
  ConfidenceBadge,
  EntityLink,
  EntityList,
} from "@/components/ui/kit";
import { deathByVictim, locationById, storylineById } from "@/lib/db";
import type { StoryEvent } from "@/lib/types";
import styles from "./Chronology.module.css";

const FOCUSABLE =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function ChronologyDrawer({
  event,
  onClose,
}: {
  event: StoryEvent;
  onClose: () => void;
}) {
  const titleId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const location = event.locationId
    ? locationById.get(event.locationId)
    : undefined;
  const storylines = event.storylineIds
    .map((id) => storylineById.get(id))
    .filter((storyline) => storyline !== undefined);

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        keyboardEvent.preventDefault();
        onClose();
        return;
      }
      if (keyboardEvent.key !== "Tab" || !drawerRef.current) return;
      const focusable = [
        ...drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (keyboardEvent.shiftKey && document.activeElement === first) {
        keyboardEvent.preventDefault();
        last.focus();
      } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
        keyboardEvent.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.drawerBackdrop}>
      <button
        type="button"
        aria-label="Close incident record"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`${styles.drawer} dossier dossier-gold bg-panel p-5`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="intel-label-gold">Incident record</div>
            <h2
              id={titleId}
              className="royal-heading mt-1 text-xl leading-snug"
            >
              {event.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-gold-line hover:text-parchment"
          >
            Close
          </button>
        </header>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <EventKindChip kind={event.kind} />
          <ChapterRef ch={event.chapter} />
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold">
            {event.day !== undefined ? `Day ${event.day}` : "Day unplaced"}
            {event.approxTime
              ? ` · ${event.approxTime}`
              : " · Time not recorded"}
          </span>
          <ConfidenceBadge level={event.confidence} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-parchment">
          {event.summary}
        </p>

        <dl className="mt-5 space-y-3 border-y border-line py-4 text-sm">
          {event.participantIds.length > 0 && (
            <div>
              <dt className="intel-label mb-1">Involved</dt>
              <dd>
                <EntityList ids={event.participantIds} />
              </dd>
            </div>
          )}
          {event.witnessIds && event.witnessIds.length > 0 && (
            <div>
              <dt className="intel-label mb-1">Witnessed by</dt>
              <dd>
                <EntityList ids={event.witnessIds} />
              </dd>
            </div>
          )}
          {location && (
            <div>
              <dt className="intel-label mb-1">Location</dt>
              <dd>
                <Link
                  href={`/map?location=${location.id}&ch=${event.chapter}`}
                  className="text-teal hover:text-gold-bright"
                >
                  {location.name}
                </Link>
              </dd>
            </div>
          )}
          {storylines.length > 0 && (
            <div>
              <dt className="intel-label mb-1">Storylines</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {storylines.map((storyline) => (
                  <Link
                    key={storyline.id}
                    href={`/storylines/${storyline.id}`}
                    className="text-teal hover:text-gold-bright"
                  >
                    {storyline.name}
                  </Link>
                ))}
              </dd>
            </div>
          )}
          {event.casualtyIds && event.casualtyIds.length > 0 && (
            <div>
              <dt className="intel-label mb-1 text-blood-bright">Casualties</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {event.casualtyIds.map((id) => (
                  <span key={id}>
                    <span className="line-through decoration-blood">
                      <EntityLink id={id} />
                    </span>
                    {deathByVictim.has(id) && (
                      <Link
                        href={`/deaths#${id}`}
                        className="ml-1 font-mono text-[9px] uppercase tracking-wider text-blood-bright hover:text-gold-bright"
                      >
                        record ▸
                      </Link>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {event.consequences && event.consequences.length > 0 && (
          <section className="mt-5">
            <div className="intel-label-gold">Consequences</div>
            <ul className="mt-2 space-y-2 border-l border-gold-line pl-4">
              {event.consequences.map((consequence) => (
                <li key={consequence} className="text-sm text-parchment">
                  {consequence}
                </li>
              ))}
            </ul>
          </section>
        )}

        {event.evidence && event.evidence.length > 0 && (
          <section className="mt-6">
            <div className="intel-label-gold">Source ledger</div>
            <ol className="mt-2 space-y-2">
              {event.evidence.map((evidence, index) => (
                <li
                  key={`${evidence.chapter}-${evidence.note}-${index}`}
                  className="border-l-2 border-gold-line bg-bg-deep/45 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[9px] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ChapterRef ch={evidence.chapter} />
                    <ConfidenceBadge level={evidence.confidence} />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-parchment">
                    {evidence.note}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <Link
          href={`/chronology?view=reveal&event=${event.id}`}
          className="mt-6 flex items-center justify-between border border-gold-line bg-gold/5 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-gold-bright hover:bg-gold/10"
        >
          Locate in Reveal Order <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
