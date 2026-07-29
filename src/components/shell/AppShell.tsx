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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="https://github.com/SarKurd/Black-Whale-Nexus"
                target="_blank"
                rel="noopener noreferrer"
                className="intel-label inline-flex items-center gap-1.5 text-muted transition-colors hover:text-parchment"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0 fill-current"
                >
                  <path d="M12 .297a12 12 0 0 0-3.793 23.39c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.04-1.416-4.04-1.416-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.009 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.806 5.624-5.478 5.921.43.372.814 1.103.814 2.222v3.293c0 .322.216.694.825.576A12.001 12.001 0 0 0 12 .297" />
                </svg>
                GitHub ↗
              </a>
              <a
                href="https://ko-fi.com/sarbast"
                target="_blank"
                rel="noopener noreferrer"
                className="intel-label inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0 fill-current"
                >
                  <path d="M11.351 2.715c-2.7 0-4.986.025-6.83.26C2.078 3.285 0 5.154 0 8.61c0 3.506.182 6.13 1.585 8.493 1.584 2.701 4.233 4.182 7.662 4.182h.83c4.209 0 6.494-2.234 7.637-4a9.5 9.5 0 0 0 1.091-2.338C21.792 14.688 24 12.22 24 9.208v-.415c0-3.247-2.13-5.507-5.792-5.87-1.558-.156-2.65-.208-6.857-.208m0 1.947c4.208 0 5.09.052 6.571.182 2.624.311 4.13 1.584 4.13 4v.39c0 2.156-1.792 3.844-3.87 3.844h-.935l-.156.649c-.208 1.013-.597 1.818-1.039 2.546-.909 1.428-2.545 3.064-5.922 3.064h-.805c-2.571 0-4.831-.883-6.078-3.195-1.09-2-1.298-4.155-1.298-7.506 0-2.181.857-3.402 3.012-3.714 1.533-.233 3.559-.26 6.39-.26m6.547 2.287c-.416 0-.65.234-.65.546v2.935c0 .311.234.545.65.545 1.324 0 2.051-.754 2.051-2s-.727-2.026-2.052-2.026m-10.39.182c-1.818 0-3.013 1.48-3.013 3.142 0 1.533.858 2.857 1.949 3.897.727.701 1.87 1.429 2.649 1.896a1.47 1.47 0 0 0 1.507 0c.78-.467 1.922-1.195 2.623-1.896 1.117-1.039 1.974-2.364 1.974-3.897 0-1.662-1.247-3.142-3.039-3.142-1.065 0-1.792.545-2.338 1.298-.493-.753-1.246-1.298-2.312-1.298" />
                </svg>
                Support the archive ↗
              </a>
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
