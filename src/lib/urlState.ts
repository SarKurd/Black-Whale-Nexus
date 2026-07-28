"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const URL_STATE_EVENT = "nexus:url-state";

type HistoryMode = "push" | "replace";
type QueryUpdate = string | number | null | undefined;

/** Update one or more query parameters without reloading the current route. */
export function updateUrlState(
  updates: Record<string, QueryUpdate>,
  mode: HistoryMode = "replace",
) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history[mode === "push" ? "pushState" : "replaceState"](
    null,
    "",
    next,
  );
  window.dispatchEvent(new Event(URL_STATE_EVENT));
}

/** Read and persist a string-valued query parameter. */
export function useUrlString(
  key: string,
  fallback = "",
  isValid: (value: string) => boolean = () => true,
) {
  const [value, setValue] = useState(fallback);
  const validator = useRef(isValid);
  validator.current = isValid;

  useEffect(() => {
    const sync = () => {
      const raw = new URL(window.location.href).searchParams.get(key);
      setValue(raw !== null && validator.current(raw) ? raw : fallback);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener(URL_STATE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(URL_STATE_EVENT, sync);
    };
  }, [fallback, key]);

  const setUrlValue = useCallback(
    (next: string, mode: HistoryMode = "replace") => {
      setValue(next);
      updateUrlState({ [key]: next === fallback ? null : next }, mode);
    },
    [fallback, key],
  );

  return [value, setUrlValue] as const;
}

/** Create a share URL containing view state, never private reader preferences. */
export function buildShareUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("scope");
  return url.toString();
}
