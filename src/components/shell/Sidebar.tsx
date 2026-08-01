"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV: {
  group: string;
  items: { href: string; label: string; code: string }[];
}[] = [
  {
    group: "Overview",
    items: [{ href: "/", label: "Command Center", code: "00" }],
  },
  {
    group: "Registry",
    items: [
      { href: "/characters", label: "Characters", code: "01" },
      { href: "/princes", label: "Princes", code: "02" },
      { href: "/factions", label: "Factions", code: "03" },
      { href: "/nen", label: "Nen Archive", code: "04" },
      { href: "/glossary", label: "Glossary", code: "05" },
    ],
  },
  {
    group: "Operations",
    items: [
      { href: "/web", label: "Relationship Web", code: "06" },
      { href: "/storylines", label: "Storylines", code: "07" },
      { href: "/chronology", label: "Event Archive", code: "08" },
      { href: "/chapters", label: "Chapters", code: "09" },
      { href: "/map", label: "Black Whale Map", code: "10" },
    ],
  },
  {
    group: "Analysis",
    items: [
      { href: "/knowledge", label: "Knowledge Network", code: "11" },
      { href: "/deaths", label: "Death Tracker", code: "12" },
      { href: "/mysteries", label: "Mysteries", code: "13" },
      { href: "/compare", label: "Compare", code: "14" },
      { href: "/theories", label: "Theory Room", code: "15" },
      { href: "/declassified", label: "Declassified", code: "16" },
    ],
  },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="nexus-sidebar flex h-full flex-col overflow-y-auto border-r border-line">
      <Link
        href="/"
        onClick={onNavigate}
        className="nexus-brand flex items-center gap-3 border-b border-line px-4 py-4"
      >
        <span className="nexus-mark-badge" aria-hidden="true">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="#c9a24a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bwm nexus-mark"
            focusable="false"
          >
            <title>Black Whale Nexus mark</title>
            <g className="bwm-ship">
              <path
                className="bwm-tier"
                d="M29 10.5 L29 7.8 Q29 7 30 7 L32 7 Q33 7 33 7.8 L33 10.5"
              />
              <path
                className="bwm-tier"
                d="M25 16 L25 11.5 Q25 10.5 26 10.5 L36 10.5 Q37 10.5 37 11.5 L37 16"
              />
              <path
                className="bwm-tier"
                d="M21 22.8 L21 17 Q21 16 22 16 L40 16 Q41 16 41 17 L41 23.6"
              />
              <path
                className="bwm-hull"
                d="M7 37.5 C7 29 18 22.5 30 22.5 C40 22.5 47.5 27 49.5 33 C52.5 28.5 56.5 25.5 60.5 24.5 C58.5 28 57.5 31 58 34 C60.5 36.5 62 40.5 62.5 44.5 C58.5 42.5 54.5 40.5 51.5 39.5 C47.5 44.5 39.5 47.5 30 47.5 C18 47.5 7 44 7 37.5 Z"
              />
              <path
                className="bwm-detail"
                d="M25 19.5 h2 M30 19.5 h2 M35 19.5 h2"
                strokeWidth="1.6"
              />
              <path
                className="bwm-detail"
                d="M8.5 38.5 Q15 41.5 23 41.5"
                strokeWidth="1.6"
              />
              <circle
                className="bwm-eye"
                cx="13"
                cy="34"
                r="1.5"
                fill="#c9a24a"
                stroke="none"
              />
            </g>
            <g className="bwm-water-motion" opacity="0.5" strokeWidth="1.6">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to="-16 0"
                dur="3.2s"
                repeatCount="indefinite"
              />
              <path d="M-14 54 Q-10 51.5 -6 54 T2 54 T10 54 T18 54 T26 54 T34 54 T42 54 T50 54 T58 54 T66 54 T74 54 T82 54 T90 54 T98 54 T106 54 T114 54" />
            </g>
            <g className="bwm-water-static" opacity="0.5" strokeWidth="1.6">
              <path d="M-14 54 Q-10 51.5 -6 54 T2 54 T10 54 T18 54 T26 54 T34 54 T42 54 T50 54 T58 54 T66 54 T74 54 T82 54 T90 54 T98 54 T106 54 T114 54" />
            </g>
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <div className="intel-label-gold">Kakin Royal Archive</div>
          <div className="royal-heading mt-1 text-lg leading-tight">
            Black Whale
            <br />
            Nexus
          </div>
        </div>
      </Link>
      <div className="flex-1 px-2 py-3">
        {NAV.map((group) => (
          <div key={group.group} className="nexus-nav-group mb-4">
            <div className="intel-label px-2 pb-1.5">{group.group}</div>
            {group.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  data-active={active ? "true" : undefined}
                  className={`nexus-nav-item group flex items-center gap-2.5 px-2 py-1.5 text-sm ${
                    active ? "text-ivory" : "text-muted hover:text-parchment"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] tracking-widest ${
                      active ? "text-gold" : "text-faint group-hover:text-muted"
                    }`}
                  >
                    {item.code}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="intel-label text-faint">
          Unofficial fan analysis
          <br />
          HxH © Yoshihiro Togashi
        </div>
      </div>
    </nav>
  );
}
