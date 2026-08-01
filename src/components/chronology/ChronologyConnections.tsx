"use client";

import { linkHorizontal, linkVertical } from "d3-shape";
import { useLayoutEffect, useState } from "react";
import styles from "./Chronology.module.css";

type Point = { x: number; y: number };
type ConnectionKind =
  | "day"
  | "exact"
  | "approximate"
  | "period"
  | "reveal"
  | "unknown"
  | "pre-voyage";

interface MeasuredPath {
  id: string;
  d: string;
  kind: ConnectionKind;
  selected: boolean;
}

interface Geometry {
  width: number;
  height: number;
  paths: MeasuredPath[];
}

function classFor(kind: ConnectionKind, selected: boolean): string {
  const precisionClass =
    kind === "approximate"
      ? styles.pathApproximate
      : kind === "period"
        ? styles.pathPeriod
        : kind === "reveal"
          ? styles.pathReveal
          : kind === "unknown"
            ? styles.pathUnknown
            : kind === "pre-voyage"
              ? styles.pathPreVoyage
              : "";
  return `${styles.path} ${precisionClass} ${selected ? styles.pathSelected : ""}`;
}

export function ChronologyConnections({
  root,
  measureKey,
  selectedId,
}: {
  root: HTMLElement | null;
  measureKey: string;
  selectedId?: string;
}) {
  const [geometry, setGeometry] = useState<Geometry>({
    width: 0,
    height: 0,
    paths: [],
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: the visible event signature must force a fresh DOM measurement even though the nodes are queried from root.
  useLayoutEffect(() => {
    if (!root) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rootRect = root.getBoundingClientRect();
      const width = root.scrollWidth;
      const height = root.scrollHeight;
      const anchors = [
        ...root.querySelectorAll<HTMLElement>("[data-chronology-anchor]"),
      ];
      const sources = new Map(
        [...root.querySelectorAll<HTMLElement>("[data-chronology-source]")].map(
          (element) => [element.dataset.chronologySource, element],
        ),
      );
      const cards = [
        ...root.querySelectorAll<HTMLElement>("[data-chronology-event]"),
      ];
      const paths: MeasuredPath[] = [];
      const vertical = linkVertical<unknown, Point>()
        .x((point) => point.x)
        .y((point) => point.y);
      const horizontal = linkHorizontal<unknown, Point>()
        .x((point) => point.x)
        .y((point) => point.y);

      const center = (element: HTMLElement): Point => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left - rootRect.left + rect.width / 2,
          y: rect.top - rootRect.top + rect.height / 2,
        };
      };

      for (let index = 1; index < anchors.length; index += 1) {
        const from = anchors[index - 1];
        const to = anchors[index];
        const d = vertical({ source: center(from), target: center(to) });
        if (!d) continue;
        paths.push({
          id: `spine-${index}`,
          d,
          kind: (to.dataset.chronologyKind as ConnectionKind) ?? "day",
          selected: false,
        });
      }

      for (const card of cards) {
        const sourceId = card.dataset.chronologySourceId;
        const eventId = card.dataset.chronologyEvent;
        const source = sourceId ? sources.get(sourceId) : undefined;
        if (!source || !eventId) continue;
        const sourcePoint = center(source);
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left - rootRect.left + rect.width / 2;
        const target: Point = {
          x:
            cardCenterX < sourcePoint.x
              ? rect.right - rootRect.left
              : rect.left - rootRect.left,
          y: rect.top - rootRect.top + Math.min(34, rect.height / 2),
        };
        const d = horizontal({ source: sourcePoint, target });
        if (!d) continue;
        paths.push({
          id: `branch-${eventId}`,
          d,
          kind: (card.dataset.chronologyKind as ConnectionKind) ?? "unknown",
          selected: eventId === selectedId,
        });
      }

      setGeometry({ width, height, paths });
    };

    const schedule = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("resize", schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [root, measureKey, selectedId]);

  if (geometry.paths.length === 0) return null;
  return (
    <svg
      aria-hidden="true"
      className={styles.connections}
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
    >
      {geometry.paths.map((path) => (
        <g key={path.id}>
          <path d={path.d} className={styles.pathUnderlay} />
          <path d={path.d} className={classFor(path.kind, path.selected)} />
        </g>
      ))}
    </svg>
  );
}
