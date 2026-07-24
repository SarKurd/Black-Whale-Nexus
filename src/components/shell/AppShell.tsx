"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChapterControl } from "@/components/shell/ChapterControl";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Sidebar } from "@/components/shell/Sidebar";
import { useNexusStore } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    useNexusStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="nautical-grid min-h-dvh">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden w-56 lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-bg-deep/80"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute inset-y-0 left-0 w-64 bg-bg"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.18 }}
            >
              <Sidebar onNavigate={() => setMenuOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-56">
        {/* Top intel bar */}
        <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-bg-deep/90 px-4 py-2 backdrop-blur">
          <button
            type="button"
            className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-parchment lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="intel-label-gold">Clearance</span>
          </div>
          <ChapterControl />
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-gold-line hover:text-parchment"
          >
            <span className="hidden sm:inline">Search the archive</span>
            <span className="sm:hidden">Search</span>
            <kbd className="border border-line px-1 font-mono text-[9px] text-faint">
              ⌘K
            </kbd>
          </button>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{children}</main>

        <footer className="mx-auto max-w-7xl border-t border-line px-4 py-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span className="intel-label">
              Unofficial fan archive · Hunter × Hunter © Yoshihiro Togashi
            </span>
            <span className="intel-label">
              Compiled by{" "}
              <a
                href="https://sarbast.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold transition-colors hover:text-gold-bright"
              >
                Sarbast · sarbast.dev
              </a>
            </span>
          </div>
        </footer>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}
