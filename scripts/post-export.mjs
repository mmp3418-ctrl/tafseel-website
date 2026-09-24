import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
} from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/tafseel-website";

/** GitHub Pages ignores `_`-prefixed dirs unless this file exists */
writeFileSync(join(outDir, ".nojekyll"), "");

const chunksDir = join(outDir, "_next", "static", "chunks");
const cssMirrorDir = join(outDir, "_next", "static", "css");
const assetsDir = join(outDir, "assets");

mkdirSync(cssMirrorDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

/** Largest CSS chunk = compiled Tailwind/globals bundle */
function findMainCss() {
  if (!existsSync(chunksDir)) return null;
  const files = readdirSync(chunksDir).filter((f) => f.endsWith(".css"));
  if (!files.length) return null;
  let best = files[0];
  let bestSize = 0;
  for (const f of files) {
    const size = statSync(join(chunksDir, f)).size;
    if (size > bestSize) {
      bestSize = size;
      best = f;
    }
  }
  return join(chunksDir, best);
}

const mainCss = findMainCss();
if (!mainCss) {
  console.error("[post-export] ERROR: no CSS chunk found under _next/static/chunks");
  process.exit(1);
}

const siteCss = join(assetsDir, "site.css");
copyFileSync(mainCss, siteCss);
copyFileSync(mainCss, join(cssMirrorDir, "site.css"));

/** Also mirror every chunk CSS into static/css */
for (const name of readdirSync(chunksDir)) {
  if (!name.endsWith(".css")) continue;
  copyFileSync(join(chunksDir, name), join(cssMirrorDir, name));
}

/**
 * Ensure every exported HTML includes the stable stylesheet
 * (covers cases where Next chunk CSS under `_next` 404s on Pages).
 */
const stableHref = `${basePath}/assets/site.css`;
const linkTag = `<link rel="stylesheet" href="${stableHref}"/>`;

function walkHtml(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkHtml(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    let html = readFileSync(full, "utf8");
    if (html.includes(stableHref)) continue;
    if (html.includes("</head>")) {
      html = html.replace("</head>", `${linkTag}</head>`);
    } else {
      html = linkTag + html;
    }
    writeFileSync(full, html);
  }
}

walkHtml(outDir);

console.log(
  `[post-export] .nojekyll + ${stableHref} (${statSync(siteCss).size} bytes)`
);
