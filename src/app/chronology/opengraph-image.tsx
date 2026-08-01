import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, sectionOgCard } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default function Image() {
  return sectionOgCard("/chronology");
}
