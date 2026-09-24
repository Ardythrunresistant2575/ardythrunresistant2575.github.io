# basicautomation.io

The public site for [Basic Automation](https://github.com/basic-automation) — a
showcase for every open-source project the organization publishes.

Nuxt 4 with server-side rendering, Tailwind v4, and the **Paleday Tailwind**
palette from the Omarchy theme set. One flat background, no cards, no borders,
no rounded corners, Fira Code throughout: structure comes from rules and accent
bars the way a terminal does it.

## What renders where

| Route | What it is |
| --- | --- |
| `/` | The pitch, live project stats, and the catalogue |
| `/projects` | Every public project |
| `/projects/<slug>` | A marketing page per project: hero, why it exists, features, a worked example, and the repo's README folded away underneath |
| `/api/projects` | Card-level JSON for every project |
| `/api/projects/<slug>` | One project, README included |
| `/healthz` | Liveness, for the container healthcheck |

## How the data works

Each page is rendered per request. Stars, versions, downloads, licenses,
release tags and READMEs come from the GitHub and crates.io APIs at render time —
nothing is baked in at build.

Those upstream calls sit behind Nitro's cache (`server/utils/github.ts`): 15
minutes fresh, stale-while-revalidate for 6 hours. A visitor always gets freshly
rendered markup; the numbers inside it are at most 15 minutes old. That keeps the
site under GitHub's anonymous rate limit of 60 requests an hour without making
anyone wait on a cache miss.

If GitHub or crates.io is unreachable, the render falls back to
`data/projects.generated.json` — a committed snapshot refreshed by `npm run sync`.
An upstream outage degrades the numbers, not the site.

Set `GITHUB_TOKEN` (or `NUXT_GITHUB_TOKEN`) in the environment to lift the
anonymous rate limit. It is optional; nothing needs it to work.

## Adding a project

1. Add an entry to `data/projects.ts`. That file is the editorial layer: the
   pitch, the feature copy, and the code sample that shows what the thing feels
   like to use. Everything that moves on its own is fetched, not typed.
2. If it has a wordmark, drop it in `public/projects/<slug>.svg` and set `logo`.
3. Run `npm run sync` to refresh the offline fallback snapshot.

## Development

```sh
npm install
npm run dev          # http://localhost:3000
npm run build        # .output/ — a self-contained Nitro node server
npm run start        # serve the build
npm run sync         # refresh data/projects.generated.json
```

## Deployment

The site runs as a container in the DeepStack compose project, behind Caddy,
which terminates TLS for `basicautomation.io` and proxies to it.

```sh
docker build -t ghcr.io/basic-automation/basicautomation.io:latest .
docker run --rm -p 3000:3000 ghcr.io/basic-automation/basicautomation.io:latest
```

`deploy/compose.yaml` holds the service definition as it appears in DeepStack.

## Theme

`app/assets/css/main.css` carries the whole palette. Paleday Tailwind is the
photographic negative of Palenight Tailwind: every role's colour is complemented
channel-wise, so hue flips to its opposite rather than lightness alone — the
violet accent becomes lime, the gray-800 ground becomes warm olive parchment —
then snapped back onto the nearest Tailwind v4 colour in OKLab. Every value in
the theme block is a literal Tailwind v4 colour.

To switch the site to the dark Palenight variant, swap the values in the
`@theme` block and the `ACCENT_HEX` map in `app/utils/projects.ts`.

## License

MIT.
