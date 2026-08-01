"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EVENT_KIND_META } from "@/components/story/EventRecorder";
import { ArchiveNote } from "@/components/ui/kit";
import {
  buildChronology,
  buildRevealOrder,
  type ChronologyPrecision,
  type ChronologySection,
  type RevealSection,
} from "@/lib/chronology";
import { eventById, events, storylines } from "@/lib/db";
import { useEffectiveChapter } from "@/lib/store";
import type { EventKind, StoryEvent } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";
import styles from "./Chronology.module.css";
import { ChronologyConnections } from "./ChronologyConnections";
import { ChronologyDrawer } from "./ChronologyDrawer";
import { ChronologyEventCard } from "./ChronologyEventCard";

const ALL_KINDS = Object.keys(EVENT_KIND_META) as EventKind[];
const ARCHIVE_VIEWS = ["in-universe", "reveal"] as const;
type ArchiveView = (typeof ARCHIVE_VIEWS)[number];

function sectionForEvent(event: StoryEvent, view: ArchiveView): string {
  if (view === "reveal") return `chapter-${event.chapter}`;
  if (event.day !== undefined) return `day-${event.day}`;
  return event.chronologyBeforeChapter !== undefined || event.chapter < 359
    ? "pre-voyage"
    : "unplaced";
}

function sectionDescription(section: ChronologySection): string {
  if (section.kind === "pre-voyage") {
    return "Historical flashbacks with a verified occurrence anchor appear before the main pre-voyage record. No exact calendar date is claimed.";
  }
  if (section.kind === "unplaced") {
    return "These flashback or retrospective records have no verified voyage-day placement in the archive data.";
  }
  if (section.timeGroups.length === 0) {
    return "No clock times are stated. Intra-day card order follows the source record only.";
  }
  return `${section.timeGroups.length} recorded time ${section.timeGroups.length === 1 ? "anchor" : "anchors"}; untimed incidents remain explicitly unplaced within the day.`;
}

function connectorPrecision(
  precision: ChronologyPrecision,
): ChronologyPrecision {
  return precision;
}

export function EventChronology() {
  const clearance = useEffectiveChapter();
  const rootRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const nativeFullscreenActive = useRef(false);
  const eventButtons = useRef(new Map<string, HTMLButtonElement>());
  const revealHandled = useRef<string | null>(null);
  const interactionSelectionKey = useRef<string | null>(null);
  const fallbackScrollY = useRef(0);
  const [flowElement, setFlowElement] = useState<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("pre-voyage");
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);

  const [viewValue, setViewValue] = useUrlString(
    "view",
    "in-universe",
    (value) => ARCHIVE_VIEWS.includes(value as ArchiveView),
  );
  const view = viewValue as ArchiveView;
  const [search, setSearch] = useUrlString("q");
  const [sectionFilter, setSectionFilter] = useUrlString("section", "all");
  const [kindValue, setKindValue] = useUrlString("kinds");
  const [storylineFilter, setStorylineFilter] = useUrlString("storyline");
  const [selectedId, setSelectedId] = useUrlString("event");

  const kindFilter = useMemo(
    () =>
      kindValue
        .split(",")
        .filter((kind): kind is EventKind =>
          ALL_KINDS.includes(kind as EventKind),
        ),
    [kindValue],
  );
  const clearedEvents = useMemo(
    () => events.filter((event) => event.chapter <= clearance),
    [clearance],
  );
  const allChronologySections = useMemo(
    () => buildChronology(clearedEvents),
    [clearedEvents],
  );
  const allRevealSections = useMemo(
    () => buildRevealOrder(clearedEvents),
    [clearedEvents],
  );
  const allSections =
    view === "in-universe" ? allChronologySections : allRevealSections;
  const visibleStorylines = useMemo(() => {
    const ids = new Set(clearedEvents.flatMap((event) => event.storylineIds));
    return storylines
      .filter(
        (storyline) =>
          storyline.introducedCh <= clearance && ids.has(storyline.id),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [clearedEvents, clearance]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return clearedEvents.filter((event) => {
      if (
        sectionFilter !== "all" &&
        sectionForEvent(event, view) !== sectionFilter
      )
        return false;
      if (kindFilter.length > 0 && !kindFilter.includes(event.kind))
        return false;
      if (storylineFilter && !event.storylineIds.includes(storylineFilter))
        return false;
      if (
        query &&
        !`${event.title} ${event.summary}`.toLowerCase().includes(query)
      )
        return false;
      return true;
    });
  }, [clearedEvents, kindFilter, search, sectionFilter, storylineFilter, view]);
  const chronologySections = useMemo(
    () => (view === "in-universe" ? buildChronology(filteredEvents) : []),
    [filteredEvents, view],
  );
  const revealSections = useMemo(
    () => (view === "reveal" ? buildRevealOrder(filteredEvents) : []),
    [filteredEvents, view],
  );
  const sections = view === "in-universe" ? chronologySections : revealSections;
  const filteredIds = useMemo(
    () => new Set(filteredEvents.map((event) => event.id)),
    [filteredEvents],
  );
  const selectedEvent = selectedId ? eventById.get(selectedId) : undefined;
  const selectedSectionKey = selectedEvent
    ? sectionForEvent(selectedEvent, view)
    : null;
  const selectedLocationKey = selectedId ? `${view}:${selectedId}` : null;
  const visibleSelectedEvent =
    selectedEvent && selectedEvent.chapter <= clearance
      ? selectedEvent
      : undefined;
  const isFocused = nativeFullscreen || fallbackFullscreen;

  const clearFilters = useCallback(() => {
    setSearch("");
    setSectionFilter("all");
    setKindValue("");
    setStorylineFilter("");
  }, [setKindValue, setSearch, setSectionFilter, setStorylineFilter]);

  const changeView = useCallback(
    (nextView: ArchiveView) => {
      if (nextView === view) return;
      setViewValue(nextView);
      setSectionFilter("all");
      setActiveSection(
        nextView === "in-universe"
          ? (allChronologySections[0]?.key ?? "pre-voyage")
          : (allRevealSections[0]?.key ?? "chapter-340"),
      );
    },
    [
      allChronologySections,
      allRevealSections,
      setSectionFilter,
      setViewValue,
      view,
    ],
  );

  useEffect(() => {
    if (!selectedId || revealHandled.current === selectedId) return;
    revealHandled.current = selectedId;
    const target = eventById.get(selectedId);
    if (!target || target.chapter > clearance) {
      setSelectedId("");
      return;
    }
    if (!filteredIds.has(selectedId)) clearFilters();
  }, [clearFilters, clearance, filteredIds, selectedId, setSelectedId]);

  useEffect(() => {
    if (
      !selectedId ||
      !selectedSectionKey ||
      !selectedLocationKey ||
      !filteredIds.has(selectedId)
    )
      return;
    if (interactionSelectionKey.current === selectedLocationKey) return;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(`event-${selectedId}`);
      if (!target) return;
      const renderedSection = target.closest<HTMLElement>(
        "[data-chronology-section]",
      );
      if (renderedSection?.dataset.chronologySection !== selectedSectionKey)
        return;
      target.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "nearest",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [filteredIds, selectedId, selectedLocationKey, selectedSectionKey]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const isActive = document.fullscreenElement === rootRef.current;
      const wasActive = nativeFullscreenActive.current;
      nativeFullscreenActive.current = isActive;
      setNativeFullscreen(isActive);
      if (wasActive && !isActive) {
        requestAnimationFrame(() => fullscreenButtonRef.current?.focus());
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!fallbackFullscreen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape" && !visibleSelectedEvent) {
        keyboardEvent.preventDefault();
        setFallbackFullscreen(false);
        requestAnimationFrame(() => fullscreenButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.scrollTo({ top: fallbackScrollY.current });
    };
  }, [fallbackFullscreen, visibleSelectedEvent]);

  useEffect(() => {
    if (!flowElement || sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(
            (visible.target as HTMLElement).dataset.chronologySection ??
              sections[0].key,
          );
        }
      },
      {
        root: isFocused ? rootRef.current : null,
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.15, 0.4, 0.7],
      },
    );
    for (const section of flowElement.querySelectorAll<HTMLElement>(
      "[data-chronology-section]",
    )) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [flowElement, isFocused, sections]);

  const jumpToSection = useCallback((key: string) => {
    document.getElementById(`chronology-${key}`)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, []);

  const enterFullscreen = useCallback(async () => {
    const root = rootRef.current;
    if (!root) return;
    if (document.fullscreenElement === root) {
      await document.exitFullscreen();
      return;
    }
    if (fallbackFullscreen) {
      setFallbackFullscreen(false);
      return;
    }
    fallbackScrollY.current = window.scrollY;
    try {
      if (!root.requestFullscreen) throw new Error("Fullscreen unavailable");
      await root.requestFullscreen();
    } catch {
      setFallbackFullscreen(true);
      requestAnimationFrame(() => jumpToSection(activeSection));
    }
  }, [activeSection, fallbackFullscreen, jumpToSection]);

  const selectEvent = useCallback(
    (event: StoryEvent) => {
      interactionSelectionKey.current = `${view}:${event.id}`;
      setSelectedId(event.id, "push");
    },
    [setSelectedId, view],
  );
  const closeDrawer = useCallback(() => {
    const previousId = selectedId;
    interactionSelectionKey.current = null;
    setSelectedId("");
    requestAnimationFrame(() =>
      eventButtons.current.get(previousId)?.focus({ preventScroll: true }),
    );
  }, [selectedId, setSelectedId]);

  const timestampedCount = filteredEvents.filter(
    (event) => event.approxTime,
  ).length;
  const measureKey = `${view}-${isFocused}-${selectedId}-${filteredEvents
    .map((event) => event.id)
    .join("|")}`;
  const selectClass =
    "border border-line bg-panel px-2 py-2 text-xs text-parchment outline-none focus:border-gold";

  return (
    <div
      ref={rootRef}
      className={`${styles.focusRoot} ${
        fallbackFullscreen ? styles.fallbackFullscreen : ""
      }`}
    >
      <header className="archive-page-header mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="intel-label-gold">Two readings of the record</div>
          <h1 className="royal-heading mt-1 text-3xl sm:text-4xl">
            Event Archive
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Follow the story by when incidents happened, or replay it in the
            order Togashi disclosed them. The same verified records power both
            views; only their organizing sequence changes.
          </p>
        </div>
      </header>

      <fieldset className="mb-4 grid max-w-3xl gap-2 sm:grid-cols-2">
        <legend className="sr-only">Event ordering</legend>
        <button
          type="button"
          aria-pressed={view === "in-universe"}
          onClick={() => changeView("in-universe")}
          className={`border p-3 text-left transition-colors ${
            view === "in-universe"
              ? "border-gold bg-gold/10"
              : "border-line bg-panel/55 hover:border-line-strong"
          }`}
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold-bright">
            <span aria-hidden>◷</span> In-Universe Order
          </span>
          <span className="mt-1 block text-xs text-muted">
            When each event happened inside the story.
          </span>
        </button>
        <button
          type="button"
          aria-pressed={view === "reveal"}
          onClick={() => changeView("reveal")}
          className={`border p-3 text-left transition-colors ${
            view === "reveal"
              ? "border-teal bg-teal/10"
              : "border-line bg-panel/55 hover:border-line-strong"
          }`}
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-teal">
            <span aria-hidden>▤</span> Reveal Order
          </span>
          <span className="mt-1 block text-xs text-muted">
            When readers learned it, chapter by chapter.
          </span>
        </button>
      </fieldset>

      <div className="mb-4 grid grid-cols-3 border border-line bg-bg-deep/55 sm:max-w-xl">
        <div className="border-r border-line p-3">
          <div className="font-mono text-lg text-ivory">
            {filteredEvents.length}
          </div>
          <div className="intel-label">records in view</div>
        </div>
        <div className="border-r border-line p-3">
          <div className="font-mono text-lg text-gold">{timestampedCount}</div>
          <div className="intel-label">time-stamped</div>
        </div>
        <div className="p-3">
          <div className="font-mono text-lg text-teal">{sections.length}</div>
          <div className="intel-label">
            {view === "in-universe" ? "time sectors" : "chapters"}
          </div>
        </div>
      </div>

      <div
        className={`${styles.focusHeader} sticky top-[52px] z-40 mb-4 border border-line bg-bg-deep/94 shadow-xl backdrop-blur lg:top-[49px]`}
      >
        <div className="flex flex-wrap items-center gap-2 p-2.5">
          <label className="min-w-[12rem] flex-1">
            <span className="sr-only">Search chronology</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search incident records…"
              className="w-full border border-line bg-panel px-3 py-2 text-xs text-parchment placeholder:text-faint focus:border-gold focus:outline-none"
            />
          </label>
          <label>
            <span className="sr-only">
              {view === "in-universe"
                ? "Filter by voyage day"
                : "Filter by reveal chapter"}
            </span>
            <select
              value={sectionFilter}
              onChange={(event) => setSectionFilter(event.target.value)}
              className={selectClass}
            >
              <option value="all">
                {view === "in-universe" ? "All time sectors" : "All chapters"}
              </option>
              {allSections.map((section) => (
                <option key={section.key} value={section.key}>
                  {section.label}
                </option>
              ))}
            </select>
          </label>
          <label className="hidden sm:block">
            <span className="sr-only">Filter by storyline</span>
            <select
              value={storylineFilter}
              onChange={(event) => setStorylineFilter(event.target.value)}
              className={selectClass}
            >
              <option value="">All storylines</option>
              {visibleStorylines.map((storyline) => (
                <option key={storyline.id} value={storyline.id}>
                  {storyline.name}
                </option>
              ))}
            </select>
          </label>
          <button
            ref={fullscreenButtonRef}
            type="button"
            onClick={enterFullscreen}
            aria-pressed={isFocused}
            className="border border-gold-line bg-gold/5 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-gold-bright hover:bg-gold/10"
          >
            {isFocused ? "Exit full screen" : "Full screen"}
          </button>
          {(search ||
            sectionFilter !== "all" ||
            kindFilter.length > 0 ||
            storylineFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-2 py-2 font-mono text-[9px] uppercase tracking-widest text-teal hover:text-gold-bright"
            >
              Reset
            </button>
          )}
        </div>

        <details className="border-t border-line px-2.5 py-2">
          <summary className="cursor-pointer list-none font-mono text-[9px] uppercase tracking-widest text-muted hover:text-parchment">
            Event kinds
            {kindFilter.length > 0 ? ` · ${kindFilter.length} active` : ""} ▾
          </summary>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ALL_KINDS.map((kind) => {
              const active = kindFilter.includes(kind);
              const meta = EVENT_KIND_META[kind];
              return (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    const next = active
                      ? kindFilter.filter((item) => item !== kind)
                      : [...kindFilter, kind];
                    setKindValue(next.join(","));
                  }}
                  className="border px-2 py-1 font-mono text-[9px] uppercase tracking-wider"
                  style={{
                    color: active ? meta.color : "var(--faint)",
                    borderColor: active ? meta.color : "var(--line)",
                    background: active
                      ? "color-mix(in srgb, currentColor 8%, transparent)"
                      : "transparent",
                  }}
                >
                  {meta.glyph} {meta.label}
                </button>
              );
            })}
          </div>
        </details>

        {sections.length > 0 && (
          <nav
            aria-label="Chronology sections"
            className="flex gap-1 overflow-x-auto border-t border-line p-2"
          >
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => jumpToSection(section.key)}
                aria-label={`Jump to ${section.label}, ${section.events.length} ${section.events.length === 1 ? "record" : "records"}`}
                aria-current={
                  activeSection === section.key ? "location" : undefined
                }
                className={`shrink-0 border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                  activeSection === section.key
                    ? "border-gold bg-gold/10 text-gold-bright"
                    : "border-line text-muted hover:text-parchment"
                }`}
              >
                {section.shortLabel}
                <span className="ml-1 text-faint">{section.events.length}</span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {view === "in-universe" ? (
        <div className="mb-4 grid gap-2 border border-line bg-panel/65 p-3 text-[10px] leading-relaxed text-muted sm:grid-cols-3">
          <div>
            <span className="mr-2 text-gold-bright">━</span>
            <strong className="font-normal text-parchment">
              Recorded clock
            </strong>{" "}
            · solid links share a stated time.
          </div>
          <div>
            <span className="mr-2 text-gold">┄</span>
            <strong className="font-normal text-parchment">
              Broad or approximate
            </strong>{" "}
            · placement is intentionally qualified.
          </div>
          <div>
            <span className="mr-2 text-gold-dim">┈</span>
            <strong className="font-normal text-parchment">
              Time not recorded
            </strong>{" "}
            · card order follows the archive, not a claimed clock.
          </div>
        </div>
      ) : (
        <div className="mb-4 grid gap-2 border border-line bg-panel/65 p-3 text-[10px] leading-relaxed text-muted sm:grid-cols-3">
          <div>
            <span className="mr-2 text-teal">━</span>
            <strong className="font-normal text-parchment">
              Chapter sequence
            </strong>{" "}
            · the flow follows manga reveal order.
          </div>
          <div>
            <span className="mr-2 text-gold">◷</span>
            <strong className="font-normal text-parchment">
              Story time retained
            </strong>{" "}
            · day and time remain visible on each card.
          </div>
          <div>
            <span className="mr-2 text-faint">≡</span>
            <strong className="font-normal text-parchment">
              Within one chapter
            </strong>{" "}
            · cards retain archive entry order.
          </div>
        </div>
      )}

      {sections.length === 0 ? (
        <ArchiveNote>
          No incidents match this clearance and filter set. Reset the filters to
          reopen the complete chronology.
        </ArchiveNote>
      ) : (
        <div
          ref={setFlowElement}
          className={`${styles.flowSurface} dossier corner-ticks`}
        >
          <ChronologyConnections
            root={flowElement}
            measureKey={measureKey}
            selectedId={selectedId}
          />
          <div className="relative z-10">
            {view === "in-universe"
              ? chronologySections.map((section) => (
                  <ChronologyDay
                    key={section.key}
                    section={section}
                    selectedId={selectedId}
                    eventButtons={eventButtons}
                    onSelect={selectEvent}
                  />
                ))
              : revealSections.map((section) => (
                  <RevealChapter
                    key={section.key}
                    section={section}
                    selectedId={selectedId}
                    eventButtons={eventButtons}
                    onSelect={selectEvent}
                  />
                ))}
          </div>
        </div>
      )}

      <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-wide text-faint">
        {view === "in-universe"
          ? "Chapter numbers identify when the reader received a record. Voyage day and time identify when it occurred. Untimed cards are never assigned a fabricated position within their day."
          : "Chapters identify when the reader received each record. Voyage day and time remain visible as in-universe context but do not control this view's order."}
      </p>

      {visibleSelectedEvent && (
        <ChronologyDrawer event={visibleSelectedEvent} onClose={closeDrawer} />
      )}
    </div>
  );
}

function RevealChapter({
  section,
  selectedId,
  eventButtons,
  onSelect,
}: {
  section: RevealSection;
  selectedId: string;
  eventButtons: React.RefObject<Map<string, HTMLButtonElement>>;
  onSelect: (event: StoryEvent) => void;
}) {
  const recordedDays = [
    ...new Set(
      section.events
        .map((event) => event.day)
        .filter((day): day is number => day !== undefined),
    ),
  ].sort((a, b) => a - b);
  const timedCount = section.events.filter((event) => event.approxTime).length;

  return (
    <section
      id={`chronology-${section.key}`}
      data-chronology-section={section.key}
      className={`${styles.daySection} scroll-mt-44`}
      aria-labelledby={`chronology-title-${section.key}`}
    >
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div
          data-chronology-anchor
          data-chronology-source={`marker-${section.key}`}
          data-chronology-kind="reveal"
          className="mx-auto flex h-16 w-16 flex-col items-center justify-center rounded-full border border-teal bg-bg-deep shadow-[0_0_0_7px_rgba(6,10,19,0.94),0_0_30px_rgba(102,143,140,0.15)]"
        >
          <span className="font-mono text-[7px] uppercase tracking-widest text-muted">
            CH
          </span>
          <span className="font-mono text-[11px] tracking-wider text-teal">
            {section.chapter}
          </span>
        </div>
        <div className="mt-4 intel-label text-teal">Manga reveal sequence</div>
        <h2
          id={`chronology-title-${section.key}`}
          className="royal-heading mt-1 text-2xl"
        >
          {section.label}
        </h2>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-widest text-faint">
          <span>
            {section.events.length}{" "}
            {section.events.length === 1 ? "record" : "records"}
          </span>
          {timedCount > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{timedCount} with story time</span>
            </>
          )}
          {recordedDays.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{recordedDays.map((day) => `D${day}`).join(", ")}</span>
            </>
          )}
        </div>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted">
          These incidents entered the reader&apos;s record in chapter{" "}
          {section.chapter}. Their day and clock labels describe story time, not
          the ordering of this view.
        </p>
      </div>

      <div className="relative mt-6">
        {section.events.map((event, index) => {
          const sourceId = `reveal-${section.chapter}-${event.id}`;
          const side = index % 2 === 0 ? "left" : "right";
          return (
            <div key={event.id} className={styles.eventRow}>
              <span
                data-chronology-anchor
                data-chronology-source={sourceId}
                data-chronology-kind="reveal"
                className={`${styles.centerAnchor} mt-3 flex h-3 w-3 items-center justify-center rounded-full border border-teal bg-bg-deep shadow-[0_0_0_4px_rgba(4,7,14,0.9)]`}
                aria-hidden
              >
                <span className="h-0.5 w-0.5 rounded-full bg-teal" />
              </span>
              <ChronologyEventCard
                event={event}
                sourceId={sourceId}
                precision="reveal"
                side={side}
                selected={selectedId === event.id}
                buttonRef={(element) => {
                  if (element) eventButtons.current.set(event.id, element);
                  else eventButtons.current.delete(event.id);
                }}
                onSelect={() => onSelect(event)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ChronologyDay({
  section,
  selectedId,
  eventButtons,
  onSelect,
}: {
  section: ChronologySection;
  selectedId: string;
  eventButtons: React.RefObject<Map<string, HTMLButtonElement>>;
  onSelect: (event: StoryEvent) => void;
}) {
  const markerKind =
    section.kind === "day"
      ? "day"
      : section.kind === "pre-voyage"
        ? "pre-voyage"
        : "unknown";
  const chapterRange =
    section.firstChapter === section.lastChapter
      ? `CH.${section.firstChapter}`
      : `CH.${section.firstChapter}–${section.lastChapter}`;
  let cardIndex = 0;

  const renderCard = (
    event: StoryEvent,
    sourceId: string,
    precision: ChronologyPrecision | "pre-voyage",
  ) => {
    const side = cardIndex++ % 2 === 0 ? "left" : "right";
    return (
      <div key={event.id} className={styles.eventRow}>
        <ChronologyEventCard
          event={event}
          sourceId={sourceId}
          precision={precision}
          side={side}
          selected={selectedId === event.id}
          buttonRef={(element) => {
            if (element) eventButtons.current.set(event.id, element);
            else eventButtons.current.delete(event.id);
          }}
          onSelect={() => onSelect(event)}
        />
      </div>
    );
  };

  return (
    <section
      id={`chronology-${section.key}`}
      data-chronology-section={section.key}
      className={`${styles.daySection} scroll-mt-44`}
      aria-labelledby={`chronology-title-${section.key}`}
    >
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div
          data-chronology-anchor
          data-chronology-source={`marker-${section.key}`}
          data-chronology-kind={markerKind}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-bg-deep shadow-[0_0_0_7px_rgba(6,10,19,0.94),0_0_30px_rgba(179,149,74,0.15)]"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright">
            {section.kind === "day"
              ? `D${section.day}`
              : section.kind === "pre-voyage"
                ? "PRE"
                : "?"}
          </span>
        </div>
        <div className="mt-4 intel-label-gold">
          {section.kind === "day" ? "Voyage chronology" : "Archive time sector"}
        </div>
        <h2
          id={`chronology-title-${section.key}`}
          className="royal-heading mt-1 text-2xl"
        >
          {section.label}
        </h2>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-widest text-faint">
          <span>{section.events.length} records</span>
          <span aria-hidden>·</span>
          <span>{chapterRange}</span>
          {section.timeGroups.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{section.timeGroups.length} time anchors</span>
            </>
          )}
        </div>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted">
          {sectionDescription(section)}
        </p>
      </div>

      {section.timeGroups.map((timeGroup) => {
        const sourceId = `${section.key}-${timeGroup.key}`;
        return (
          <div key={timeGroup.key} className="relative mt-8">
            <div className="flex justify-center py-3">
              <div
                data-chronology-anchor
                data-chronology-source={sourceId}
                data-chronology-kind={timeGroup.precision}
                className="relative z-10 min-w-28 border border-gold-line bg-bg-deep px-3 py-2 text-center shadow-[0_0_0_5px_rgba(4,7,14,0.9)]"
              >
                <div className="font-mono text-[11px] tracking-wider text-gold-bright">
                  {timeGroup.label}
                </div>
                <div className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-faint">
                  {timeGroup.mixedPrecision
                    ? "mixed precision"
                    : timeGroup.precision === "period"
                      ? "broad time band"
                      : timeGroup.precision === "approximate"
                        ? "approximate clock"
                        : "recorded clock"}
                </div>
              </div>
            </div>
            {timeGroup.events.map((event) =>
              renderCard(
                event,
                sourceId,
                connectorPrecision(timeGroup.precision),
              ),
            )}
          </div>
        );
      })}

      {section.untimedEvents.length > 0 && (
        <div className={styles.unknownBlock}>
          <header className="relative z-10 mx-auto mb-4 max-w-2xl text-center">
            <div className="intel-label">Unplaced within this time sector</div>
            <h3 className="royal-heading mt-1 text-base">Time not recorded</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-faint">
              {section.kind === "pre-voyage"
                ? "Verified historical flashbacks appear first; otherwise order follows source chapters. The dashed path does not claim an exact date."
                : "Display order follows source chapters and archive entry order; the dashed path is an index, not a claim of exact sequence."}
            </p>
          </header>
          <div className="relative z-10">
            {section.untimedEvents.map((event) => {
              const sourceId = `unknown-${section.key}-${event.id}`;
              const precision =
                section.kind === "pre-voyage" ? "pre-voyage" : "unknown";
              const side = cardIndex++ % 2 === 0 ? "left" : "right";
              return (
                <div key={event.id} className={styles.eventRow}>
                  <span
                    data-chronology-anchor
                    data-chronology-source={sourceId}
                    data-chronology-kind={precision}
                    className={`${styles.centerAnchor} mt-3 flex h-3 w-3 items-center justify-center rounded-full border border-gold-dim bg-bg-deep shadow-[0_0_0_4px_rgba(4,7,14,0.9)]`}
                    aria-hidden
                  >
                    <span className="h-0.5 w-0.5 rounded-full bg-gold-dim" />
                  </span>
                  <ChronologyEventCard
                    event={event}
                    sourceId={sourceId}
                    precision={precision}
                    side={side}
                    selected={selectedId === event.id}
                    buttonRef={(element) => {
                      if (element) eventButtons.current.set(event.id, element);
                      else eventButtons.current.delete(event.id);
                    }}
                    onSelect={() => onSelect(event)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
