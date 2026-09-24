<script setup lang="ts">
import type { EnrichedProject } from '~~/shared/types/project'

const { project } = defineProps<{ project: EnrichedProject }>()
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    :style="accentVar(project.accent)"
    class="group block"
  >
    <!-- Media. A screenshot when there is one, the wordmark when there isn't,
         and the project's name set large when there is neither — the point is
         that every card occupies the same block so the grid stays even. No
         frame, no fill: the media sits straight on the page's ground. -->
    <div class="flex aspect-16/10 items-center justify-center overflow-hidden">
      <img
        v-if="project.screenshot"
        :src="project.screenshot"
        :alt="`${project.name} screenshot`"
        loading="lazy"
        class="h-full w-full object-cover object-top transition-opacity duration-300 group-hover:opacity-90"
      >
      <img
        v-else-if="project.logo"
        :src="project.logo"
        :alt="project.name"
        loading="lazy"
        class="max-h-[62%] max-w-[78%] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      >
      <span
        v-else
        aria-hidden="true"
        class="text-4xl text-pn-rule transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-5xl"
      >{{ project.name }}</span>
    </div>

    <div class="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 class="text-base text-pn-fg-bright transition-colors group-hover:text-[var(--accent)]">
        {{ project.name }}
      </h3>
      <span class="text-xs text-pn-muted">
        {{ project.kind.toLowerCase() }}<span v-if="project.meta?.language"> · {{ project.meta.language }}</span>
      </span>
      <StatusDot :status="project.status" class="ml-auto" />
    </div>

    <p class="mt-2 text-sm leading-relaxed text-pn-dim">
      {{ project.tagline }}
    </p>

    <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-pn-muted">
      <span v-if="project.meta?.stars">
        <span class="text-pn-yellow">★</span> {{ project.meta.stars }}
      </span>
      <span v-if="project.meta?.crateVersion" :style="{ color: 'var(--accent)' }">
        v{{ project.meta.crateVersion }}
      </span>
      <span v-if="project.meta?.license">{{ project.meta.license }}</span>
      <span v-if="project.meta?.pushedAt">updated {{ relativeTime(project.meta.pushedAt) }}</span>
      <span class="ml-auto text-pn-dim transition-colors group-hover:text-[var(--accent)]">open →</span>
    </div>
  </NuxtLink>
</template>
