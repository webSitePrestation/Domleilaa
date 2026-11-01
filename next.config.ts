import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * `turbopack.root` : sans cela, `next dev` peut résoudre `@import "tailwindcss"` depuis le dossier parent
 * (ex. `C:\Users\...\Documents`) au lieu de ce projet, ce qui provoque « Can't resolve 'tailwindcss' ».
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
