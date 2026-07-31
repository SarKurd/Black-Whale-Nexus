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
      { href: "/timeline", label: "Timeline", code: "08" },
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
    <nav className="flex h-full flex-col overflow-y-auto border-r border-line bg-bg-deep/80">
      <Link
        href="/"
        onClick={onNavigate}
        className="block border-b border-line px-4 py-4"
      >
        <div className="intel-label-gold">Kakin Empire · Classified</div>
        <div className="royal-heading mt-1 text-lg leading-tight">
          Black Whale
          <br />
          Nexus
        </div>
      </Link>
      <div className="flex-1 px-2 py-3">
        {NAV.map((group) => (
          <div key={group.group} className="mb-4">
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
                  className={`group flex items-center gap-2.5 border-l px-2 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-gold bg-gold/5 text-ivory"
                      : "border-transparent text-muted hover:border-line-strong hover:text-parchment"
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
