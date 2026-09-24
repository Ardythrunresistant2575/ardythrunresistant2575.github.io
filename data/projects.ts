/**
 * Curated catalogue of Basic Automation's public software.
 *
 * This is the editorial layer: the pitch, the feature copy, the code that
 * actually shows what a project feels like to use. Everything that moves on
 * its own — stars, versions, downloads, READMEs — is fetched live from GitHub
 * and crates.io at request time (see server/utils/github.ts).
 *
 * To add a project: add an entry here, drop a logo in public/projects/ if it
 * has one, then run `npm run sync` to refresh the offline fallback snapshot.
 */

/** A key in the Paleday Tailwind palette, used to tint a project's page. */
export type Accent = 'magenta' | 'cyan' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'

export type Status = 'stable' | 'active' | 'alpha' | 'archived'

export interface Feature {
  /** Three or four words, sentence case */
  title: string
  /** One or two sentences saying what it means for the person using it */
  body: string
}

export interface CodeSample {
  /** Shown above the block, e.g. "src/main.rs" or "Cargo.toml" */
  label: string
  code: string
}

export interface Project {
  /** URL segment: /projects/<slug> */
  slug: string
  /** Repository name under github.com/basic-automation */
  repo: string
  /** Display name */
  name: string
  /** Wordmark in public/projects/, shown instead of the name in the page hero */
  logo?: string
  /** One line, sentence case, no trailing period — cards, lists and <title> */
  tagline: string
  /** The headline claim. Short, declarative, the one thing to remember. */
  hero: string
  /** Two or three sentences for the lede and the meta description */
  summary: string
  /** Why it exists — the problem, stated plainly, before any feature list */
  problem: string
  /** Short kind-of-thing label, e.g. "Rust crate" */
  kind: string
  status: Status
  accent: Accent
  /** Sort order on the landing page; lower is first */
  order: number
  /** The marketing body: what it does, in terms of what you get */
  features: Feature[]
  /** Optional one-liner to get started */
  install?: CodeSample
  /** Optional worked example — the strongest argument most libraries have */
  example?: CodeSample
  /** crates.io crate name, when the project is published there */
  crate?: string
  /** Extra links beyond GitHub/crates.io/docs.rs */
  links?: { label: string, href: string }[]
}

export const projects: Project[] = [
  {
    slug: 'artiqwest',
    repo: 'artiqwest',
    name: 'artiqwest',
    logo: '/projects/artiqwest.svg',
    tagline: 'HTTP and WebSockets over Tor, in pure Rust',
    hero: 'Every request, through Tor.',
    summary:
      'An HTTP client that routes every request through the Tor network using arti_client '
      + 'and hyper — no external tor daemon, no SOCKS plumbing, no configuration. Three '
      + 'functions: get, post and ws.',
    problem:
      'Talking to an onion service from Rust usually means running a tor daemon beside your '
      + 'program, wiring a SOCKS proxy into your HTTP client, and hoping the two stay in step. '
      + 'artiqwest removes that whole layer: the Tor client is compiled into your binary, and '
      + 'the call site looks like any other HTTP call.',
    kind: 'Rust crate',
    status: 'stable',
    accent: 'magenta',
    order: 1,
    features: [
      {
        title: 'No daemon, no proxy',
        body: 'The Arti Tor client is embedded in your binary. Nothing to install alongside it, nothing to supervise, no torrc, no SOCKS port to keep in sync.',
      },
      {
        title: 'Three functions',
        body: 'get, post and ws. That is the entire surface area — there is no builder to learn and no client to thread through your application.',
      },
      {
        title: 'WebSockets that actually work',
        body: 'Full-duplex connections to onion services and clearnet hosts alike, over tokio-tungstenite. Both paths are tested.',
      },
      {
        title: 'Bring your own client, or don\'t',
        body: 'Pass an existing arti TorClient if you already have one bootstrapped. If you don\'t, artiqwest builds and manages one for you.',
      },
      {
        title: 'Survives circuit loss',
        body: 'An expired or dropped TorClient is reloaded automatically, up to five times, before the call is allowed to fail.',
      },
      {
        title: 'Sensible about localhost',
        body: 'Requests to localhost fall through to reqwest rather than being pushed out over the Tor network and back again.',
      },
    ],
    install: { label: 'Cargo.toml', code: 'cargo add artiqwest' },
    example: {
      label: 'src/main.rs',
      code: `use artiqwest::{get, post, ws};

#[tokio::main]
async fn main() {
    // Clearnet, over Tor.
    let response = get("https://httpbin.org/get", None, None).await.unwrap();
    assert_eq!(response.status(), 200);

    // A hidden service, with headers.
    let body = r#"{"test": "testing"}"#;
    let headers = vec![("Content-Type", "application/json")];
    let response = post("http://vpns6exmqmg5znqmgxa5c6rgzpt6imy5yzrbsoszovgfipdjypnchpyd.onion/echo",
                        body, Some(headers), None).await.unwrap();
    assert_eq!(response.to_string(), body);

    // And a websocket, same idea.
    let (mut write, read) = ws("wss://example.onion/socket", None).await.unwrap();
}`,
    },
    crate: 'artiqwest',
  },
  {
    slug: 'onyums',
    repo: 'onyums',
    name: 'onyums',
    logo: '/projects/onyums.svg',
    tagline: 'Serve an axum app as a Tor onion service',
    hero: 'Your axum app, as an onion service.',
    summary:
      'An axum wrapper for onion services that is secure and complete by default. It '
      + 'bootstraps the Tor client, generates TLS certificates, upgrades HTTP to HTTPS and '
      + 'sits your router behind a built-in abuse-defense gate.',
    problem:
      'Standing up an onion service normally means assembling it: a tor daemon, a torrc, '
      + 'certificates, a reverse proxy, rate limiting, and a list of ways to get it subtly '
      + 'wrong. Onyums ships the hard parts enabled. You opt down from safety when you have '
      + 'a reason to, rather than opting up to it one feature flag at a time.',
    kind: 'Rust crate',
    status: 'stable',
    accent: 'cyan',
    order: 2,
    features: [
      {
        title: 'Secure and complete by default',
        body: 'TLS, the HTTP-to-HTTPS upgrade, the circuit policy gate and the Skin abuse-defense gate are all on before you write a line of configuration.',
      },
      {
        title: 'Arti compiled in',
        body: 'No external tor daemon, no torrc, no system service. If you have deployed behind C-tor before, the thing you are looking for to configure is deliberately not there.',
      },
      {
        title: 'Nothing inbound to open',
        body: 'Rendezvous circuits are established outbound. No port forwarded, no public IP, no firewall hole — any host that can make outbound TCP connections can serve.',
      },
      {
        title: 'A gate before the first byte',
        body: 'The circuit-level policy gate runs before anything is served, and can accept, challenge, reject or shut down a circuit on its own terms.',
      },
      {
        title: 'ConnectionInfo, not SocketAddr',
        body: 'An extractor built for private connections, where the concept of a socket address does not exist. Tell Tor traffic apart from the rest without guessing.',
      },
      {
        title: 'It is still your router',
        body: 'Hand it the axum Router you already wrote. The handlers, extractors and middleware you know all keep working.',
      },
    ],
    install: { label: 'Cargo.toml', code: 'cargo add onyums tokio --features tokio/full' },
    example: {
      label: 'src/main.rs — the whole program',
      code: `use onyums::{OnionService, routing::get, Router};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let app = Router::new().route("/", get(|| async { "Hello from Tor!" }));

    let handle = OnionService::builder()
        .router(app)
        .nickname("my_onion")   // names the identity key in the keystore
        .serve()
        .await?;

    // The address is stable across restarts (the keystore is persisted).
    println!("serving on https://{}", handle.onion_address());

    // Resolves once the descriptor is published and the service is reachable.
    handle.ready().await;

    tokio::signal::ctrl_c().await?;
    handle.shutdown().await;
    Ok(())
}`,
    },
    crate: 'onyums',
  },
  {
    slug: 'nisaba',
    repo: 'nisaba',
    name: 'Nisaba',
    tagline: 'One product catalog, synced across every marketplace you sell on',
    hero: 'One catalog. Every marketplace.',
    summary:
      'A desktop app that holds a local master catalog of products and variants and keeps '
      + 'inventory, pricing, descriptions and photos in sync across eBay, Squarespace, '
      + 'XMR Bazaar and Amazon.',
    problem:
      'Selling the same products in four places means maintaining four catalogs, and every '
      + 'sale silently desynchronises them. Nisaba keeps one master locally and reconciles '
      + 'the rest to it — including platforms that track stock as a mode rather than a number.',
    kind: 'Desktop app',
    status: 'active',
    accent: 'blue',
    order: 3,
    features: [
      {
        title: 'Four platforms, one model',
        body: 'eBay, Squarespace, XMR Bazaar and Amazon sit behind one PlatformAdapter trait, each declaring what it can actually do so the UI never offers what a platform will refuse.',
      },
      {
        title: 'Reconciliation, not overwriting',
        body: 'A sync engine with quantity deltas, conflict resolution and sale detection — including for platforms that use stock modes instead of numeric quantities.',
      },
      {
        title: 'Supplier catalogs, sandboxed',
        body: 'Vendor plugins are TypeScript modules executed in an embedded Deno runtime. They import SKUs, variants, dealer pricing and inventory without being trusted with the rest of the app.',
      },
      {
        title: 'Peer-to-peer over Tor',
        body: 'Optional sync between installs across Tor onion services, with AES-GCM encrypted payloads. Two shops, one catalog, no server in the middle.',
      },
      {
        title: 'Secrets in the keyring',
        body: 'Platform credentials live in the OS keyring, not in the catalog database and not in a config file next to it.',
      },
      {
        title: 'Analytics that stay local',
        body: 'Per-product history and time-windowed analytics, charted in the app, computed from your own data on your own machine.',
      },
    ],
    links: [{ label: 'Built with Tauri 2', href: 'https://v2.tauri.app' }],
  },
  {
    slug: 'skidbladnir',
    repo: 'Skidbladnir',
    name: 'Skidbladnir',
    tagline: 'A desktop GUI for next-generation image formats',
    hero: 'Modern image formats, without the flags.',
    summary:
      'A desktop front-end for the command-line converters behind modern image formats. '
      + 'It builds the shell command for you and hands it to the upstream binaries — '
      + 'WebP today via cwebp, JPEG 2000 next.',
    problem:
      'The reference encoders for these formats are excellent and entirely unapproachable: '
      + 'a wall of flags you re-learn every time you need them. Skidbladnir puts a window '
      + 'in front of them and gets the same output.',
    kind: 'Desktop app',
    status: 'active',
    accent: 'green',
    order: 4,
    features: [
      {
        title: 'Batch conversion, no flags',
        body: 'Point it at your images and pick your settings. It assembles the cwebp invocation and runs it.',
      },
      {
        title: 'The real encoders',
        body: 'It wraps the official upstream binaries rather than reimplementing the codecs, so output matches what the reference tools produce.',
      },
      {
        title: 'JPEG 2000 next',
        body: 'WebP ships today; JPEG 2000 support is in progress behind the same interface.',
      },
      {
        title: 'Nothing to install first',
        body: 'Ships as a standalone distributable with the binaries bundled — no toolchain required on the machine that runs it.',
      },
    ],
  },
]

/** Repos deliberately left off the site (this site's own repo, the old page). */
export const excludedRepos = ['basic-automation.github.io', 'basicautomation.io']

export const bySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const sortedProjects = (): Project[] =>
  [...projects].sort((a, b) => a.order - b.order)
