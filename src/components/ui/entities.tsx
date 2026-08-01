"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { entityIndex } from "@/generated/entityIndex";

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
  const entity = entityIndex[characterId];
  const color = entity?.frameColor ?? "var(--gold-dim)";
  const dims =
    size === "lg"
      ? "h-20 w-20 text-2xl"
      : size === "sm"
        ? "h-8 w-8 text-[10px]"
        : "h-12 w-12 text-sm";

  if (entity?.portrait) {
    return (
      <div
        className={`shrink-0 overflow-hidden border ${dims}`}
        style={{
          borderColor: color,
          background: `color-mix(in srgb, ${color} 8%, var(--panel))`,
        }}
        aria-hidden
      >
        {/* biome-ignore lint/performance/noImgElement: static export serves local thumbnails directly */}
        <img
          src={entity.portrait}
          alt=""
          width={160}
          height={160}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover object-top"
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
      {entity?.monogram ?? "?"}
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
  const entity = entityIndex[id];
  return (
    <Link
      href={entity?.href ?? "/"}
      className={`underline decoration-dotted underline-offset-2 transition-colors hover:text-gold-bright hover:decoration-solid ${className}`}
      style={{ color: entity?.color ?? "var(--teal)" }}
    >
      {children ?? entity?.name ?? id}
    </Link>
  );
}

/** Inline list of entity links. */
export function EntityList({ ids }: { ids: string[] }) {
  if (ids.length === 0) return <span className="text-faint">—</span>;
  return (
    <span className="text-sm">
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 && <span className="text-faint"> · </span>}
          <EntityLink id={id} />
        </span>
      ))}
    </span>
  );
}
