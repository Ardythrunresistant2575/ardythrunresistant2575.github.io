<script setup lang="ts">
import type { EnrichedProject } from '~~/shared/types/project'

const { project } = defineProps<{ project: EnrichedProject }>()
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    :style="accentVar(project.accent)"
    class="group block bar py-5 transition-colors hover:bg-black/[0.035]"
  >
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 class="text-base text-pn-fg-bright transition-colors group-hover:text-[var(--accent)]">
        {{ project.name }}
      </h3>
      <span class="text-xs text-pn-muted">
        {{ project.kind.toLowerCase() }}<span v-if="project.meta?.language"> · {{ project.meta.language }}</span>
      </span>
      <StatusDot :status="project.status" class="ml-auto" />
    </div>

    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-pn-dim">
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
