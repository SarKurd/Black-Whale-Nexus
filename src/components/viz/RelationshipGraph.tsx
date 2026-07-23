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
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(
    null,
  );

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

  function toWorld(e: React.WheelEvent | React.PointerEvent) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`${-size / 2} ${-height / 2} ${size} ${height}`}
      className="h-full w-full touch-none select-none"
      role="img"
      aria-label="Relationship network"
      onWheel={(e) => {
        if (compact) return;
        const p = toWorld(e);
        const factor = e.deltaY < 0 ? 1.12 : 0.9;
        setView((v) => {
          const k = Math.min(4, Math.max(0.35, v.k * factor));
          const scale = k / v.k;
          return {
            k,
            x: p.x - (p.x - v.x) * scale,
            y: p.y - (p.y - v.y) * scale,
          };
        });
      }}
      onPointerDown={(e) => {
        if (compact) return;
        const p = toWorld(e);
        drag.current = { x: p.x, y: p.y, vx: view.x, vy: view.y };
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const p = toWorld(e);
        setView((v) => ({
          ...v,
          x: (drag.current?.vx ?? 0) + (p.x - (drag.current?.x ?? 0)),
          y: (drag.current?.vy ?? 0) + (p.y - (drag.current?.y ?? 0)),
        }));
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onClick={() => onSelect?.(null)}
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
}
