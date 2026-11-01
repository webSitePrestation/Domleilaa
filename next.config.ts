import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Les routes `src/app/api/**` sont des API Routes (Node) : activées par défaut avec l’App Router.
 * Le dossier `data/` est lu/écrit via `fs` sous `process.cwd()` dans ces handlers (pas de config Next requise).
 * `serverExternalPackages` évite d’embarquer nodemailer dans le bundle serveur de façon fragile.
 *
 * `turbopack.root` : sans cela, `next dev` peut résoudre `@import "tailwindcss"` depuis le dossier parent
 * (ex. `C:\Users\...\Documents`) au lieu de ce projet, ce qui provoque « Can't resolve 'tailwindcss' ».
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
