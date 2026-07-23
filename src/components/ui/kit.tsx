"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { portraits } from "@/data/portraits";
import { characterById, entityHref, entityName, factionById } from "@/lib/db";
import {
  CONFIDENCE_COLOR,
  CONFIDENCE_LABEL,
  STATUS_COLOR,
  STATUS_LABEL,
} from "@/lib/spoiler";
import type { CharacterStatus, Confidence } from "@/lib/types";

/** Layered dossier panel with registration ticks. */
export function Panel({
  label,
  title,
  gold,
  children,
  className = "",
  actions,
}: {
  label?: string;
  title?: ReactNode;
  gold?: boolean;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section
      className={`dossier corner-ticks ${gold ? "dossier-gold" : ""} ${className}`}
    >
      {(label || title || actions) && (
        <header className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5">
          <div className="min-w-0">
            {label && <div className="intel-label-gold">{label}</div>}
            {title && (
              <div className="royal-heading truncate text-lg">{title}</div>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function SectionHeading({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="intel-label-gold whitespace-nowrap">{children}</span>
      <span className="h-px flex-1 bg-line" />
      {right}
    </div>
  );
}

export function StatusChip({
  status,
  note,
}: {
  status: CharacterStatus;
  note?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
      style={{ color: STATUS_COLOR[status] }}
      title={note}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: STATUS_COLOR[status] }}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function ConfidenceBadge({ level }: { level: Confidence }) {
  return (
    <span
      className="inline-block border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.15em]"
      style={{
        color: CONFIDENCE_COLOR[level],
        borderColor: "color-mix(in srgb, currentColor 40%, transparent)",
      }}
    >
      {CONFIDENCE_LABEL[level]}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-line bg-raised px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}

export function ChapterRef({ ch }: { ch: number }) {
  if (ch === 0) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
        pre-arc
      </span>
    );
  }
  return (
    <Link
      href={`/chapters/${ch}`}
      className="font-mono text-[10px] tracking-wider text-teal hover:text-gold-bright"
    >
      CH.{ch}
    </Link>
  );
}

/**
 * Square portrait, framed in the character's primary faction color.
 * Falls back to the monogram placeholder when no portrait is on file.
 */
export function Monogram({
  characterId,
  size = "md",
}: {
  characterId: string;
  size?: "sm" | "md" | "lg";
}) {
  const c = characterById.get(characterId);
  const faction = c?.factionIds[0]
    ? factionById.get(c.factionIds[0])
    : undefined;
  const color = faction?.color ?? "var(--gold-dim)";
  const dims =
    size === "lg"
      ? "h-20 w-20 text-2xl"
      : size === "sm"
        ? "h-8 w-8 text-[10px]"
        : "h-12 w-12 text-sm";
  const src = portraits[characterId];
  if (src) {
    return (
      <div
        className={`shrink-0 overflow-hidden border ${dims}`}
        style={{
          borderColor: color,
          background: `color-mix(in srgb, ${color} 8%, var(--panel))`,
        }}
        aria-hidden
      >
        {/* Plain img: local static asset, no next/image pipeline needed for export. */}
        {/* biome-ignore lint/performance/noImgElement: static export serves local files directly */}
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top"
          style={{ filter: "saturate(0.82) contrast(1.02)" }}
        />
      </div>
    );
  }
  return (
    <div
      className={`royal-heading flex shrink-0 items-center justify-center border ${dims}`}
      style={{
        borderColor: color,
        color,
        background: `color-mix(in srgb, ${color} 8%, var(--panel))`,
      }}
      aria-hidden
    >
      {c?.monogram ?? "?"}
    </div>
  );
}

/** Color-coded cross-reference link to any entity. */
export function EntityLink({
  id,
  children,
  className = "",
}: {
  id: string;
  children?: ReactNode;
  className?: string;
}) {
  const isChar = characterById.has(id);
  const isFaction = factionById.has(id);
  const color = isFaction
    ? (factionById.get(id)?.color ?? "var(--parchment)")
    : isChar
      ? "var(--ivory)"
      : "var(--teal)";
  return (
    <Link
      href={entityHref(id)}
      className={`underline decoration-dotted underline-offset-2 transition-colors hover:text-gold-bright hover:decoration-solid ${className}`}
      style={{ color }}
    >
      {children ?? entityName(id)}
    </Link>
  );
}

/** Inline list of entity links. */
export function EntityList({ ids }: { ids: string[] }) {
  if (ids.length === 0) return <span className="text-faint">—</span>;
  return (
    <span className="text-sm">
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && <span className="text-faint"> · </span>}
          <EntityLink id={id} />
        </span>
      ))}
    </span>
  );
}

/** Definition row used across dossiers. */
export function DataRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-2 border-b border-line/60 py-1.5 last:border-0">
      <div className="intel-label pt-0.5">{label}</div>
      <div className="min-w-0 text-sm text-parchment">{children}</div>
    </div>
  );
}

/** Empty-state notice styled as archive annotation. */
export function ArchiveNote({ children }: { children: ReactNode }) {
  return (
    <div className="border border-dashed border-line px-3 py-2 font-mono text-[11px] tracking-wide text-faint">
      {children}
    </div>
  );
}
