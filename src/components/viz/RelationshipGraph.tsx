"use client";

import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  characterById,
  factionById,
  princeByCharacterId,
  relationships,
} from "@/lib/db";
import {
  relationshipEnded,
  relationshipVisible,
  statusAt,
} from "@/lib/spoiler";
import type { Relationship, RelationshipKind } from "@/lib/types";

interface GraphNode extends SimulationNodeDatum {
  id: string;
  label: string;
  color: string;
  isPrince: boolean;
  dead: boolean;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  rel: Relationship;
}

/** Edge palette by relationship family. */
const KIND_FAMILY: Record<RelationshipKind, { color: string; family: string }> =
  {
    family: { color: "var(--gold)", family: "kinship" },
    romantic: { color: "var(--gold)", family: "kinship" },
    serves: { color: "#5d6b8c", family: "service" },
    commands: { color: "#5d6b8c", family: "service" },
    protects: { color: "#6f8f6a", family: "protection" },
    hired: { color: "#5d6b8c", family: "service" },
    "member-of": { color: "#4a5673", family: "service" },
    "former-member-of": { color: "#3c455c", family: "service" },
    allied: { color: "#4a7a78", family: "alliance" },
    "secret-alliance": { color: "#4a7a78", family: "alliance" },
    negotiating: { color: "#4a7a78", family: "alliance" },
    trusts: { color: "#6f8f6a", family: "trust" },
    mentoring: { color: "#7a9a97", family: "trust" },
    "teaching-nen": { color: "#7a9a97", family: "trust" },
    enemy: { color: "var(--blood)", family: "hostile" },
    hunting: { color: "var(--blood)", family: "hostile" },
    targeting: { color: "var(--blood)", family: "hostile" },
    killed: { color: "var(--blood-bright)", family: "hostile" },
    distrusts: { color: "#8c5d5d", family: "suspicion" },
    suspects: { color: "#8c5d5d", family: "suspicion" },
    monitoring: { color: "var(--warn)", family: "surveillance" },
    manipulating: { color: "var(--violet)", family: "covert" },
    blackmailing: { color: "var(--violet)", family: "covert" },
    "possessed-by": { color: "var(--violet)", family: "covert" },
    "controlled-by": { color: "var(--violet)", family: "covert" },
    "knows-identity-of": { color: "#4a7a78", family: "knowledge" },
    "knows-ability-of": { color: "#4a7a78", family: "knowledge" },
    "hiding-info-from": { color: "#8c5d5d", family: "knowledge" },
    "located-with": { color: "#3c455c", family: "logistics" },
  };

export const KIND_LABEL: Record<RelationshipKind, string> = {
  family: "Family",
  romantic: "Romantic",
  serves: "Serves",
  commands: "Commands",
  protects: "Protects",
  allied: "Allied with",
  "secret-alliance": "Secretly allied with",
  enemy: "Enemy of",
  monitoring: "Monitoring",
  manipulating: "Manipulating",
  hunting: "Hunting",
  targeting: "Targeting",
  suspects: "Suspects",
  trusts: "Trusts",
  distrusts: "Distrusts",
  killed: "Killed",
  hired: "Hired",
  blackmailing: "Blackmailing",
  negotiating: "Negotiating with",
  mentoring: "Mentoring",
  "teaching-nen": "Teaching Nen to",
  "possessed-by": "Possessed by",
  "controlled-by": "Controlled by",
  "member-of": "Member of",
  "former-member-of": "Former member of",
  "knows-identity-of": "Knows identity of",
  "knows-ability-of": "Knows ability of",
  "hiding-info-from": "Hiding information from",
  "located-with": "Located with",
};

export interface GraphSelection {
  kind: "node" | "edge";
  id: string;
}

export function RelationshipGraph({
  nodeIds,
  chapter,
  compact = false,
  focusId,
  onSelect,
  selection,
}: {
  /** Which entities to include. */
  nodeIds: Set<string>;
  /** Reconstruct the network as of this chapter. */
  chapter: number;
  compact?: boolean;
  /** Node to visually focus. */
  focusId?: string;
  onSelect?: (sel: GraphSelection | null) => void;
  selection?: GraphSelection | null;
}) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });

  // Active touch/mouse pointers keyed by id, plus the gesture in progress.
  // One pointer pans; two pinch-zoom (and pan by the midpoint). `moved` lets us
  // tell a real click apart from a drag so panning doesn't clear the selection.
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const gesture = useRef<
    | {
        type: "pan";
        startX: number;
        startY: number;
        vx: number;
        vy: number;
        moved: boolean;
      }
    | {
        type: "pinch";
        dist: number;
        midX: number;
        midY: number;
      }
    | null
  >(null);
  // Set after a real drag/pinch so the trailing click doesn't clear selection.
  const suppressClick = useRef(false);

  const { nodes, links } = useMemo(() => {
    // Visible edges at this chapter among requested nodes.
    const visLinks = relationships.filter(
      (r) =>
        relationshipVisible(r, chapter) &&
        nodeIds.has(r.from) &&
        nodeIds.has(r.to),
    );
    const connected = new Set<string>();
    for (const r of visLinks) {
      connected.add(r.from);
      connected.add(r.to);
    }
    // Nodes: characters introduced by now that are in the set. Keep isolated
    // nodes only in small graphs so big presets stay legible.
    const keepIsolated = nodeIds.size <= 16;
    const nodeList: GraphNode[] = [];
    for (const id of nodeIds) {
      const c = characterById.get(id);
      if (!c || c.introducedCh > chapter) continue;
      if (!keepIsolated && !connected.has(id)) continue;
      const st = statusAt(c, chapter);
      const faction = c.factionIds[0]
        ? factionById.get(c.factionIds[0])
        : undefined;
      nodeList.push({
        id,
        label: c.name,
        color: faction?.color ?? "var(--gold-dim)",
        isPrince: princeByCharacterId.has(id),
        dead: st?.status === "dead" || st?.status === "presumed-dead",
      });
    }
    const present = new Set(nodeList.map((n) => n.id));
    const linkList: GraphLink[] = visLinks
      .filter((r) => present.has(r.from) && present.has(r.to))
      .map((r) => ({ source: r.from, target: r.to, rel: r }));

    // Deterministic initial positions (circle by faction grouping).
    nodeList.sort((a, b) => a.color.localeCompare(b.color));
    nodeList.forEach((n, i) => {
      const angle = (i / Math.max(nodeList.length, 1)) * Math.PI * 2;
      n.x = Math.cos(angle) * 300;
      n.y = Math.sin(angle) * 300;
    });

    const sim = forceSimulation(nodeList)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(linkList)
          .id((d) => d.id)
          .distance((l) =>
            l.rel.kind === "family" || l.rel.kind === "serves" ? 70 : 120,
          )
          .strength(0.35),
      )
      .force("charge", forceManyBody().strength(-320))
      .force("center", forceCenter(0, 0))
      .force("collide", forceCollide(28))
      .stop();
    const ticks = Math.min(300, 60 + nodeList.length * 4);
    for (let i = 0; i < ticks; i++) sim.tick();

    return { nodes: nodeList, links: linkList };
  }, [nodeIds, chapter]);

  const neighborhood = useMemo(() => {
    const focus =
      focusId ?? (selection?.kind === "node" ? selection.id : undefined);
    if (!focus) return null;
    const set = new Set([focus]);
    for (const l of links) {
      const s = (l.source as GraphNode).id;
      const t = (l.target as GraphNode).id;
      if (s === focus) set.add(t);
      if (t === focus) set.add(s);
    }
    return set;
  }, [focusId, selection, links]);

  const size = compact ? 480 : 1200;
  const height = compact ? 300 : 720;

  const MIN_K = 0.35;
  const MAX_K = 4;
  const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));

  // Convert a client point into the SVG's centered viewBox coordinate space,
  // accounting for the fact that the viewBox may be letterboxed inside the
  // rendered element (preserveAspectRatio "meet").
  function toWorld(clientX: number, clientY: number) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const scale = Math.min(rect.width / size, rect.height / height);
    const drawnW = size * scale;
    const drawnH = height * scale;
    const offsetX = (rect.width - drawnW) / 2;
    const offsetY = (rect.height - drawnH) / 2;
    return {
      x: (clientX - rect.left - offsetX) / scale - size / 2,
      y: (clientY - rect.top - offsetY) / scale - height / 2,
    };
  }

  // Zoom toward a world-space anchor point, keeping that point stationary.
  function zoomAt(anchor: { x: number; y: number }, factor: number) {
    setView((v) => {
      const k = clampK(v.k * factor);
      const scale = k / v.k;
      return {
        k,
        x: anchor.x - (anchor.x - v.x) * scale,
        y: anchor.y - (anchor.y - v.y) * scale,
      };
    });
  }

  // Zoom toward the viewport center — used by the on-screen +/- buttons.
  function zoomButton(factor: number) {
    zoomAt({ x: 0, y: 0 }, factor);
  }

  // Capture all active pointers to the given element so a gesture keeps
  // tracking even when the finger/cursor leaves the node it started on.
  function capturePointers(el: Element) {
    for (const id of pointers.current.keys()) {
      try {
        el.setPointerCapture?.(id);
      } catch {
        // Non-fatal: some pointer types reject capture. Gesture still works.
      }
    }
  }

  function endPointer(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) {
      gesture.current = null;
    } else if (pointers.current.size === 1) {
      // Dropped from pinch to a single-finger pan: re-seat the pan origin.
      const [only] = [...pointers.current.values()];
      const w = toWorld(only.x, only.y);
      gesture.current = {
        type: "pan",
        startX: w.x,
        startY: w.y,
        vx: view.x,
        vy: view.y,
        moved: true,
      };
    }
  }

  const graph = (
    <svg
      ref={svgRef}
      viewBox={`${-size / 2} ${-height / 2} ${size} ${height}`}
      className="h-full w-full touch-none select-none"
      role="img"
      aria-label="Relationship network"
      onWheel={(e) => {
        if (compact) return;
        const p = toWorld(e.clientX, e.clientY);
        zoomAt(p, e.deltaY < 0 ? 1.12 : 0.9);
      }}
      onPointerDown={(e) => {
        if (compact) return;
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const pts = [...pointers.current.values()];
        if (pts.length === 1) {
          const w = toWorld(pts[0].x, pts[0].y);
          gesture.current = {
            type: "pan",
            startX: w.x,
            startY: w.y,
            vx: view.x,
            vy: view.y,
            moved: false,
          };
        } else if (pts.length === 2) {
          const dx = pts[0].x - pts[1].x;
          const dy = pts[0].y - pts[1].y;
          gesture.current = {
            type: "pinch",
            dist: Math.hypot(dx, dy) || 1,
            midX: (pts[0].x + pts[1].x) / 2,
            midY: (pts[0].y + pts[1].y) / 2,
          };
          // Capture both pointers so the pinch survives leaving the element.
          // (Done here, not on the first press, so a plain click still lands
          // on the node rather than being retargeted to the SVG.)
          capturePointers(e.currentTarget as Element);
          suppressClick.current = true;
        }
      }}
      onPointerMove={(e) => {
        const g = gesture.current;
        if (!g || !pointers.current.has(e.pointerId)) return;
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (g.type === "pan") {
          const p = toWorld(e.clientX, e.clientY);
          const nx = g.vx + (p.x - g.startX);
          const ny = g.vy + (p.y - g.startY);
          if (
            !g.moved &&
            (Math.abs(p.x - g.startX) > 3 || Math.abs(p.y - g.startY) > 3)
          ) {
            // A real drag has begun: now capture so panning keeps tracking,
            // and suppress the click that would otherwise clear the selection.
            g.moved = true;
            suppressClick.current = true;
            capturePointers(e.currentTarget as Element);
          }
          if (g.moved) setView((v) => ({ ...v, x: nx, y: ny }));
        } else {
          const pts = [...pointers.current.values()];
          if (pts.length < 2) return;
          const dx = pts[0].x - pts[1].x;
          const dy = pts[0].y - pts[1].y;
          const dist = Math.hypot(dx, dy) || 1;
          const midX = (pts[0].x + pts[1].x) / 2;
          const midY = (pts[0].y + pts[1].y) / 2;
          const anchor = toWorld(midX, midY);
          zoomAt(anchor, dist / g.dist);
          g.dist = dist;
          g.midX = midX;
          g.midY = midY;
        }
      }}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onClick={() => {
        if (suppressClick.current) {
          suppressClick.current = false;
          return;
        }
        onSelect?.(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onSelect?.(null);
      }}
    >
      <title>Relationship network</title>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M0,0.5 L7.5,4 L0,7.5"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1"
          />
        </marker>
      </defs>
      <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
        {links.map((l) => {
          const s = l.source as GraphNode;
          const t = l.target as GraphNode;
          const meta = KIND_FAMILY[l.rel.kind];
          const ended = relationshipEnded(l.rel, chapter);
          const dimmed =
            neighborhood && !(neighborhood.has(s.id) && neighborhood.has(t.id));
          const isSel = selection?.kind === "edge" && selection.id === l.rel.id;
          const dash = l.rel.secret
            ? "5 4"
            : !l.rel.confirmed
              ? "1.5 3.5"
              : undefined;
          return (
            <motion.line
              key={l.rel.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: dimmed ? 0.06 : ended ? 0.22 : isSel ? 1 : 0.55,
                x1: s.x,
                y1: s.y,
                x2: t.x,
                y2: t.y,
              }}
              transition={{ duration: 0.4 }}
              stroke={meta.color}
              strokeWidth={
                (isSel
                  ? 2.4
                  : l.rel.strength === "strong"
                    ? 1.6
                    : l.rel.strength === "moderate"
                      ? 1.1
                      : 0.7) / view.k
              }
              strokeDasharray={dash}
              markerEnd={l.rel.directed && !compact ? "url(#arrow)" : undefined}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.({ kind: "edge", id: l.rel.id });
              }}
            />
          );
        })}
        {nodes.map((n) => {
          const dimmed = neighborhood && !neighborhood.has(n.id);
          const isSel = selection?.kind === "node" && selection.id === n.id;
          const isFocus = focusId === n.id;
          const r = n.isPrince ? 15 : 10;
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: dimmed ? 0.12 : 1,
                scale: 1,
                x: n.x,
                y: n.y,
              }}
              transition={{ duration: 0.4 }}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (compact) router.push(`/characters/${n.id}`);
                else onSelect?.({ kind: "node", id: n.id });
              }}
            >
              {(isSel || isFocus) && (
                <circle
                  r={r + 6}
                  fill="none"
                  stroke="var(--gold-bright)"
                  strokeWidth={1}
                  strokeDasharray="2 3"
                />
              )}
              <circle
                r={r}
                fill="var(--panel)"
                stroke={n.dead ? "var(--blood)" : n.color}
                strokeWidth={n.isPrince ? 1.8 : 1.2}
              />
              {n.dead && (
                <>
                  <line
                    x1={-r * 0.5}
                    y1={-r * 0.5}
                    x2={r * 0.5}
                    y2={r * 0.5}
                    stroke="var(--blood)"
                    strokeWidth={1}
                  />
                  <line
                    x1={r * 0.5}
                    y1={-r * 0.5}
                    x2={-r * 0.5}
                    y2={r * 0.5}
                    stroke="var(--blood)"
                    strokeWidth={1}
                  />
                </>
              )}
              <text
                y={r + 11}
                textAnchor="middle"
                className="pointer-events-none"
                style={{
                  fill: n.dead ? "var(--faint)" : "var(--parchment)",
                  fontSize: n.isPrince ? 11 : 9.5,
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.05em",
                }}
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </g>
    </svg>
  );

  if (compact) return graph;

  return (
    <div className="relative h-full w-full">
      {graph}
      <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden border border-line bg-panel/90 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => zoomButton(1.3)}
          aria-label="Zoom in"
          className="flex h-8 w-8 items-center justify-center text-lg leading-none text-parchment hover:bg-gold/10 hover:text-gold-bright"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomButton(1 / 1.3)}
          aria-label="Zoom out"
          className="flex h-8 w-8 items-center justify-center border-t border-line text-lg leading-none text-parchment hover:bg-gold/10 hover:text-gold-bright"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => setView({ x: 0, y: 0, k: 1 })}
          aria-label="Reset view"
          className="flex h-8 w-8 items-center justify-center border-t border-line font-mono text-[9px] uppercase tracking-widest text-muted hover:bg-gold/10 hover:text-gold-bright"
        >
          Fit
        </button>
      </div>
    </div>
  );
}
