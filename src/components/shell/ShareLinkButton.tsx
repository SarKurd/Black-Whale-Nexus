"use client";

import { useRef, useState } from "react";
import { buildShareUrl } from "@/lib/urlState";

export function ShareLinkButton() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyLink() {
    const shareUrl = buildShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const field = document.createElement("textarea");
      field.value = shareUrl;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="nexus-action-button px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
      aria-label={
        copied
          ? "Intelligence link copied"
          : "Copy a link to this intelligence view"
      }
    >
      {copied ? "Copied" : "Share"}
    </button>
  );
}
