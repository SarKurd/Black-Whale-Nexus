import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, STATIC_PAGE_SEO } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Black Whale Nexus — classified dossier card";

const NAVY = "#060a13";
const GOLD = "#b3954a";
const GOLD_DIM = "#8a7239";
const IVORY = "#eae3d0";
const MUTED = "#7e8499";
const RED = "#b23434";

const fontData = Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/Cinzel.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/IBMPlexMono-Medium.ttf")),
]);

function Emblem({ size }: { size: number }) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative artwork inside a generated image
    <svg width={size} height={size} viewBox="0 0 128 128">
      <circle
        cx="64"
        cy="64"
        r="50"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.5"
      />
      <circle
        cx="64"
        cy="64"
        r="46"
        fill="none"
        stroke="rgba(179,149,74,0.55)"
        strokeWidth="0.75"
      />
      <g stroke={IVORY} strokeWidth="1" opacity="0.85">
        <line x1="64" y1="14.5" x2="64" y2="17.5" />
        <line x1="64" y1="110.5" x2="64" y2="113.5" />
        <line x1="14.5" y1="64" x2="17.5" y2="64" />
        <line x1="110.5" y1="64" x2="113.5" y2="64" />
      </g>
      <g stroke={GOLD_DIM} strokeWidth="1">
        <line x1="29" y1="29" x2="31.1" y2="31.1" />
        <line x1="99" y1="29" x2="96.9" y2="31.1" />
        <line x1="29" y1="99" x2="31.1" y2="96.9" />
        <line x1="99" y1="99" x2="96.9" y2="96.9" />
      </g>
      <path
        fill={GOLD}
        d="M30 62 C30 55 36 50 44 49 C57 47 70 50 79 56 C83 58.5 87 58.5 89 56.5 C91 52 93 47 99 43 C98 49 97 54 98 57 C102 59 105 64 106 70 C101 68 96 66.5 92 65.5 C88 68 84 70 78 71 C64 74.5 48 76 39 73 C33 71 30 67 30 62 Z"
      />
      <path fill={GOLD} d="M52 74 C55 79 54 83 49 85 C48 81 49 77 52 74 Z" />
      <circle cx="42" cy="60" r="1.7" fill={IVORY} />
    </svg>
  );
}

export interface OgCardOptions {
  fileNo: string;
  tag: string;
  title: string;
  sub: string;
}

export function ogSummary(value: string, maxLength = 132) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const clipped = normalized.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 90 ? lastSpace : undefined).trim()}…`;
}

export function sectionOgCard(path: keyof typeof STATIC_PAGE_SEO) {
  if (path === "/") {
    return ogCard({
      fileNo: "NEXUS",
      tag: "INTELLIGENCE ARCHIVE",
      title: SITE_NAME,
      sub: SITE_DESCRIPTION,
    });
  }

  const page = STATIC_PAGE_SEO[path];
  // "/" sits at index 0, so sections number from 01 in declaration order.
  const sectionNumber = Object.keys(STATIC_PAGE_SEO).indexOf(path);

  return ogCard({
    fileNo: `SECTION ${String(sectionNumber).padStart(2, "0")}`,
    tag: "ARCHIVE SECTION",
    title: page.heading,
    sub: page.description,
  });
}

export async function ogCard({ fileNo, tag, title, sub }: OgCardOptions) {
  const [cinzel, mono] = await fontData;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: NAVY,
        backgroundImage:
          "linear-gradient(rgba(179,149,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(179,149,74,0.05) 1px, transparent 1px)",
        backgroundSize: "63px 63px",
        fontFamily: "mono",
      }}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative artwork inside a generated image */}
      <svg
        width={630}
        height={630}
        viewBox="0 0 630 630"
        style={{ position: "absolute", right: -40, top: 0 }}
      >
        <g stroke="rgba(179,149,74,0.28)" strokeWidth="1">
          <line x1="180" y1="140" x2="330" y2="90" />
          <line x1="330" y1="90" x2="470" y2="160" />
          <line x1="470" y1="160" x2="560" y2="90" />
          <line x1="150" y1="470" x2="300" y2="530" />
          <line x1="300" y1="530" x2="480" y2="470" />
          <line x1="480" y1="470" x2="580" y2="540" />
          <line x1="180" y1="140" x2="150" y2="470" />
          <line x1="330" y1="90" x2="300" y2="530" />
          <line x1="470" y1="160" x2="480" y2="470" />
        </g>
        <g fill={GOLD_DIM}>
          <circle cx="180" cy="140" r="4" />
          <circle cx="470" cy="160" r="4" />
          <circle cx="560" cy="90" r="4" />
          <circle cx="150" cy="470" r="4" />
          <circle cx="300" cy="530" r="4" />
          <circle cx="480" cy="470" r="4" />
          <circle cx="580" cy="540" r="4" />
        </g>
        <circle cx="330" cy="90" r="5" fill={RED} />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: 64,
          left: 80,
          width: 720,
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 19,
            letterSpacing: "0.22em",
            color: GOLD,
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(179,149,74,0.5)",
              padding: "5px 12px",
            }}
          >
            {fileNo}
          </div>
          <div style={{ display: "flex" }}>{tag}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Cinzel",
            fontWeight: 700,
            fontSize: title.length > 28 ? 48 : 62,
            lineHeight: 1.12,
            color: IVORY,
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 2,
            backgroundColor: GOLD,
          }}
        />
        <div
          style={{
            display: "flex",
            maxWidth: 700,
            fontSize: 24,
            lineHeight: 1.5,
            color: MUTED,
          }}
        >
          {ogSummary(sub)}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 85,
          top: 125,
          display: "flex",
        }}
      >
        <Emblem size={380} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 56,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 18,
          letterSpacing: "0.2em",
          color: GOLD_DIM,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 9,
            height: 9,
            backgroundColor: RED,
          }}
        />
        <div style={{ display: "flex" }}>
          BLACK WHALE NEXUS · SUCCESSION WAR ARCHIVE
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 80,
          bottom: 56,
          display: "flex",
          fontSize: 16,
          letterSpacing: "0.18em",
          color: "#565d75",
        }}
      >
        CLASSIFIED · KAKIN
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cinzel", data: cinzel, weight: 700 },
        { name: "mono", data: mono, weight: 500 },
      ],
    },
  );
}
