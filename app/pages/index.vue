<script setup lang="ts">
const { projects } = await useProjects()

const stats = computed(() => {
  const list = projects.value
  const stars = list.reduce((n, p) => n + (p.meta?.stars ?? 0), 0)
  const downloads = list.reduce((n, p) => n + (p.meta?.crateDownloads ?? 0), 0)
  return [
    { value: String(list.length), label: 'projects' },
    { value: String(stars), label: 'stars' },
    { value: compactNumber(downloads), label: 'downloads' },
  ]
})

const description
  = 'Open-source tooling from Basic Automation: privacy-preserving Rust crates for the '
    + 'Tor network, and desktop apps for catalogs and image pipelines.'

useSeoMeta({
  title: 'basic automation — software for the productive',
  description,
  ogTitle: 'basic automation — software for the productive',
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://basicautomation.io',
  ogImage: 'https://basicautomation.io/og.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://basicautomation.io/og.png',
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-5 sm:px-6">
    <!-- ── Hero ─────────────────────────────────────────────────────────── -->
    <section class="pt-16 pb-14 sm:pt-24">
      <p class="text-xs text-pn-muted">
        <span class="text-pn-accent">basic-automation</span>@github
        <span class="text-pn-rule">:</span>~<span class="text-pn-rule">$</span> ls ./public
      </p>

      <h1 class="mt-7 text-3xl leading-tight text-pn-fg-bright sm:text-5xl">
        Software for the <span class="text-pn-accent">productive</span><span
          aria-hidden="true" class="ml-1.5 cursor"
        />
      </h1>

      <p class="mt-7 max-w-2xl text-sm leading-relaxed text-pn-dim sm:text-base">
        Small, sharp tools that do one thing without asking you to assemble it first.
        Privacy-preserving Rust crates for the Tor network, and desktop apps that take
        the tedium out of catalogs and image pipelines. All of it open source.
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
        <NuxtLink
          to="/projects"
          class="text-pn-accent transition-colors hover:text-pn-bright-magenta"
        >
          → browse projects
        </NuxtLink>
        <a
          href="https://github.com/basic-automation"
          target="_blank" rel="noreferrer noopener"
          class="text-pn-cyan transition-colors hover:text-pn-bright-cyan"
        >
          → view the source
        </a>
      </div>

      <dl class="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-xs">
        <div v-for="stat in stats" :key="stat.label" class="flex items-baseline gap-2">
          <dt class="text-pn-muted">
            {{ stat.label }}
          </dt>
          <dd class="text-base text-pn-fg-bright">
            {{ stat.value }}
          </dd>
        </div>
      </dl>
    </section>

    <!-- ── Projects ─────────────────────────────────────────────────────── -->
    <section id="projects">
      <TermRule label="projects" />
      <div class="mt-6 space-y-1">
        <ProjectRow v-for="p in projects" :key="p.slug" :project="p" />
      </div>
    </section>

    <!-- ── About ────────────────────────────────────────────────────────── -->
    <section id="about" class="mt-20">
      <TermRule label="about" />
      <div class="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-pn-dim">
        <p class="text-base text-pn-fg">
          Basic Automation builds the tools it needed and couldn't find.
        </p>
        <p>
          Most of it is Rust, and a good deal of it concerns the Tor network — not as a
          novelty, but because reaching and serving onion services should be as ordinary
          as any other HTTP call. The libraries ship secure and complete by default: the
          hard parts are enabled out of the box and you opt down when you have a reason
          to, rather than assembling safety from feature flags.
        </p>
        <p>
          Everything here is public and open source. Issues and pull requests are
          welcome on any of it.
        </p>
      </div>
    </section>
  </div>
</template>
