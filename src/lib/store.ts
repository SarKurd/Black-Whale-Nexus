"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ARC_END } from "@/lib/types";

export type SpoilerMode = "chapter" | "full";

interface PreferencesState {
  spoilerMode: SpoilerMode;
  /** Upper chapter bound when spoilerMode === "chapter". */
  spoilerChapter: number;
  hideTheories: boolean;
  setSpoilerMode: (mode: SpoilerMode) => void;
  setSpoilerChapter: (ch: number) => void;
  setHideTheories: (hide: boolean) => void;
}

export const useNexusStore = create<PreferencesState>()(
  persist(
    (set) => ({
      spoilerMode: "full",
      spoilerChapter: ARC_END,
      hideTheories: false,
      setSpoilerMode: (spoilerMode) => set({ spoilerMode }),
      setSpoilerChapter: (spoilerChapter) => set({ spoilerChapter }),
      setHideTheories: (hideTheories) => set({ hideTheories }),
    }),
    {
      name: "black-whale-nexus-prefs",
      // Rehydrate after mount (see AppShell) so the first client render
      // matches the statically prerendered HTML.
      skipHydration: true,
      // A corrupt persisted entry makes hydration fail silently, which would
      // leave useStoreHydrated false forever — drop it and hydrate defaults.
      onRehydrateStorage: () => (_state, error) => {
        if (!error) return;
        useNexusStore.persist.clearStorage();
        void useNexusStore.persist.rehydrate();
      },
    },
  ),
);

/**
 * The chapter the whole app renders "as of".
 * chapter → user-selected upper bound
 * full   → ARC_END
 * (A legacy "anime" value from an older persisted pref falls through to the
 * chapter bound rather than breaking.)
 */
export function useEffectiveChapter(): number {
  const mode = useNexusStore((s) => s.spoilerMode);
  const ch = useNexusStore((s) => s.spoilerChapter);
  if (mode === "full") return ARC_END;
  return ch;
}

/**
 * True once the persisted preferences have been rehydrated (AppShell triggers
 * that after mount). Writes that *derive from* persisted state must wait for
 * this — a child effect that runs before rehydration would persist the
 * defaults right over the reader's saved preferences.
 */
export function useStoreHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (useNexusStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useNexusStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
