"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ARC_END } from "@/lib/types";

export type SpoilerMode = "chapter" | "full";

interface PreferencesState {
  spoilerMode: SpoilerMode;
  /** Upper chapter bound when spoilerMode === "chapter". */
  spoilerChapter: number;
  hideTheories: boolean;
  density: "comfortable" | "compact";
  favoriteCharacterIds: string[];
  recentlyViewed: { href: string; label: string }[];
  completedPaths: string[];
  setSpoilerMode: (mode: SpoilerMode) => void;
  setSpoilerChapter: (ch: number) => void;
  setHideTheories: (hide: boolean) => void;
  setDensity: (d: "comfortable" | "compact") => void;
  toggleFavorite: (characterId: string) => void;
  pushRecent: (entry: { href: string; label: string }) => void;
  markPathCompleted: (pathId: string) => void;
}

export const useNexusStore = create<PreferencesState>()(
  persist(
    (set) => ({
      spoilerMode: "full",
      spoilerChapter: ARC_END,
      hideTheories: false,
      density: "comfortable",
      favoriteCharacterIds: [],
      recentlyViewed: [],
      completedPaths: [],
      setSpoilerMode: (spoilerMode) => set({ spoilerMode }),
      setSpoilerChapter: (spoilerChapter) => set({ spoilerChapter }),
      setHideTheories: (hideTheories) => set({ hideTheories }),
      setDensity: (density) => set({ density }),
      toggleFavorite: (characterId) =>
        set((s) => ({
          favoriteCharacterIds: s.favoriteCharacterIds.includes(characterId)
            ? s.favoriteCharacterIds.filter((id) => id !== characterId)
            : [...s.favoriteCharacterIds, characterId],
        })),
      pushRecent: (entry) =>
        set((s) => ({
          recentlyViewed: [
            entry,
            ...s.recentlyViewed.filter((r) => r.href !== entry.href),
          ].slice(0, 12),
        })),
      markPathCompleted: (pathId) =>
        set((s) => ({
          completedPaths: s.completedPaths.includes(pathId)
            ? s.completedPaths
            : [...s.completedPaths, pathId],
        })),
    }),
    {
      name: "black-whale-nexus-prefs",
      // Rehydrate after mount (see AppShell) so the first client render
      // matches the statically prerendered HTML.
      skipHydration: true,
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
