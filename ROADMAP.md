# basicautomation.io — roadmap

A pure phase-ordered task queue. Every item is a `[ ]` or `[x]` checkbox. Done
or to-do, nothing else: shipped consumer-facing capability becomes a feature in
`README.md`, everything not-done goes here, and git history plus the PRs are the
record. There is no run log.

## Phase 0 — Foundations ✅

- [x] Nuxt 4 + Tailwind v4 + Paleday Tailwind theme, flat terminal design language
- [x] Server-rendered pages with live GitHub + crates.io data, Nitro-cached
- [x] Committed fallback snapshot so an upstream outage can't take the site down
- [x] Per-project marketing pages: hero, why, features, worked example, folded README
- [x] Self-hosted Fira Code, org logo, favicons, Open Graph card
- [x] Container image + DeepStack service + Caddy route for the apex domain
- [x] Server-side syntax highlighting (Shiki) in a Paleday TextMate theme, for both
      the worked examples and the READMEs — no highlighter in the client bundle
- [x] Borderless card grid with project wordmarks and screenshots
- [x] The real Basic Automation mark, inlined as SVG so it takes the theme colour

## Phase 1 — Content

- [ ] Per-project Open Graph cards instead of one shared org card
- [ ] A short changelog strip per project, from the GitHub releases API
- [ ] Copy pass on `data/projects.ts` for Nisaba and Skidbladnir — both are thinner than the two crates
- [ ] Screenshots for Nisaba and Enlil — Skidbladnir has one, the rest are all type

## Phase 2 — Discovery

- [ ] `sitemap.xml` and `robots.txt`
- [ ] JSON-LD `SoftwareSourceCode` per project page
- [ ] RSS/Atom feed of releases across the org

## Phase 3 — Operations

- [ ] Create the `glance.basicautomation.io` DNS record in Cloudflare — the Caddy
      site block exists and validates, but the name does not resolve yet, so
      Glance is only reachable on the LAN at `:5188` since it moved off the apex

- [ ] Ship `GITHUB_TOKEN` to the container so the rate limit stops being a factor
- [ ] Structured request logging, and a `status` page fed by `/healthz`
- [ ] Alert when the site has been serving from the fallback snapshot for more than an hour
- [ ] Trim the image: the runtime layer is still a full `node:24-alpine`
- [ ] Revisit the type checker: `vue-tsc` does not support TypeScript 7 (it still
      reaches for `typescript/lib/tsc`, which TS 7 no longer exports), so the
      project uses Golar via its `golar/unstable` entrypoint — move off `unstable`
      once a stable one exists, or back to `vue-tsc` once it supports TS 7

## Phase 4 — Reach

- [ ] Serve the site as a Tor onion service too, via `onyums` — the org's own crate, on the org's own site
- [ ] Decide what happens to `basic-automation.github.io`, which still serves the old page

## Cross-cutting

- [ ] Accessibility pass: focus order, contrast against the parchment ground, reduced-motion (partially done)
- [ ] A real 404 check: every internal link, every render, on every route
