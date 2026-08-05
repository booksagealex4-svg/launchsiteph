// Generates public/sitemap.xml from the static route list plus the slugs
// found in the templates and articles data files. Runs automatically before
// every build via the "prebuild" script in package.json.
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")

// Placeholder domain — update once the real domain is registered and
// deployed. Kept in sync manually with src/lib/site.ts (a plain Node
// script can't import that TS module without extra tooling).
const SITE_URL = "https://launchsiteph.com"

function extractSlugs(filePath) {
  const source = readFileSync(path.join(rootDir, filePath), "utf-8")
  const matches = source.matchAll(/slug:\s*"([a-z0-9-]+)"/g)
  return [...matches].map((m) => m[1])
}

const templateSlugs = extractSlugs("src/data/templates.ts")
const articleSlugs = extractSlugs("src/data/articles.ts")

// /admin/* is excluded — private, disallowed in robots.txt.
const staticRoutes = [
  "/",
  "/templates",
  "/pricing",
  "/process",
  "/resources",
  "/about",
  "/contact",
  "/referral",
  "/privacy",
  "/terms",
  "/refund-policy",
]

const routes = [
  ...staticRoutes,
  ...templateSlugs.map((slug) => `/templates/${slug}`),
  ...articleSlugs.map((slug) => `/resources/${slug}`),
]

const urlEntries = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`
  )
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`

writeFileSync(path.join(rootDir, "public/sitemap.xml"), xml)

console.log(`Generated sitemap.xml with ${routes.length} routes.`)
