import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "out");

// GitHub Pages ignores underscore dirs (_next) unless .nojekyll is present
writeFileSync(join(outDir, ".nojekyll"), "");

/**
 * Next 16 / Turbopack emits CSS under `_next/static/chunks/*.css`.
 * Mirror into `_next/static/css/` so tooling/docs that expect that path still work,
 * and keep original chunk URLs (what index.html references) intact.
 */
const chunksDir = join(outDir, "_next", "static", "chunks");
const cssDir = join(outDir, "_next", "static", "css");

if (existsSync(chunksDir)) {
  mkdirSync(cssDir, { recursive: true });
  for (const name of readdirSync(chunksDir)) {
    if (!name.endsWith(".css")) continue;
    copyFileSync(join(chunksDir, name), join(cssDir, name));
  }
}

console.log("[post-export] Ensured out/.nojekyll and mirrored CSS → _next/static/css/");
