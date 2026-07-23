import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Static export: `next build` emits plain HTML/JS to ./out. The whole app is
  // client-only (no route handlers, server actions, or headers/cookies), so it
  // ships as flat files to Cloudflare Pages — no Worker runs React per request.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
