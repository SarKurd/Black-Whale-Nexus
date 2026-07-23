"use client";

import { useEffect, useState } from "react";

/**
 * True after hydration. Persisted preferences (spoiler chapter, favorites)
 * differ from the prerendered defaults, so anything reading them must wait
 * one frame to avoid a hydration mismatch.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
