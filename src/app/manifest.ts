import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Black Whale Nexus",
    short_name: "BW Nexus",
    description:
      "Classified intelligence archive for the Hunter × Hunter Succession War aboard Black Whale No. 1.",
    start_url: "/",
    display: "standalone",
    background_color: "#060a13",
    theme_color: "#060a13",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
