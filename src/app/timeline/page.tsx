"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ArchiveNote } from "@/components/ui/kit";

export default function LegacyTimelinePage() {
  return (
    <Suspense fallback={<TimelineMovedNotice />}>
      <TimelineRedirect />
    </Suspense>
  );
}

function TimelineRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("view", "reveal");
    router.replace(`/chronology?${nextParams.toString()}`);
  }, [router, searchParams]);

  return <TimelineMovedNotice />;
}

function TimelineMovedNotice() {
  return (
    <ArchiveNote>
      The chapter timeline now lives inside the Event Archive as Reveal Order.{" "}
      <Link
        href="/chronology?view=reveal"
        className="text-teal hover:text-gold-bright"
      >
        Open the consolidated archive →
      </Link>
    </ArchiveNote>
  );
}
