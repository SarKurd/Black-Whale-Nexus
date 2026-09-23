import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Archive",
  alternates: { canonical: "/chronology" },
  robots: { index: false, follow: true },
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
