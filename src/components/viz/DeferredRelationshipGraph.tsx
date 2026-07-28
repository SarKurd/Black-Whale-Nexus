"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const RelationshipGraph = dynamic(() =>
  import("./RelationshipGraph").then((module) => module.RelationshipGraph),
);

/** Load the force simulation only when its board is close to the viewport. */
export function DeferredRelationshipGraph({
  nodeIds,
  chapter,
}: {
  nodeIds: Set<string>;
  chapter: number;
}) {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "320px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="h-full"
      aria-label="Active conflict network"
    >
      {ready ? (
        <RelationshipGraph nodeIds={nodeIds} chapter={chapter} compact />
      ) : (
        <div className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-faint">
          Network simulation standing by…
        </div>
      )}
    </section>
  );
}
