"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ChapterControl } from "@/components/shell/ChapterControl";
import { ShareLinkButton } from "@/components/shell/ShareLinkButton";
import { Sidebar } from "@/components/shell/Sidebar";
import { useNexusStore } from "@/lib/store";

const CommandPalette = dynamic(() =>
  import("@/components/shell/CommandPalette").then(
    (module) => module.CommandPalette,
  ),
);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void Promise.resolve(useNexusStore.persist.rehydrate());

    // Scope is a private reader preference, not part of a shared view.
    // Clean up links created by older versions without applying their value.
    const url = new URL(window.location.href);
    if (url.searchParams.has("scope")) {
      url.searchParams.delete("scope");
      window.history.replaceState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuDialogRef.current) return;
      const focusable = [
        ...menuDialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    requestAnimationFrame(() =>
      menuDialogRef.current?.querySelector<HTMLElement>("a[href]")?.focus(),
    );
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteLoaded(true);
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
              ref={menuDialogRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
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
            ref={menuButtonRef}
            type="button"
            className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-parchment lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
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
            onClick={() => {
              setPaletteLoaded(true);
              setPaletteOpen(true);
            }}
            className="flex items-center gap-2 border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-gold-line hover:text-parchment"
          >
            <span className="hidden sm:inline">Search the archive</span>
            <span className="sm:hidden">Search</span>
            <kbd className="border border-line px-1 font-mono text-[9px] text-faint">
              ⌘K
            </kbd>
          </button>
          <ShareLinkButton />
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

      {paletteLoaded && (
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />
      )}
    </div>
  );
}
