<script setup lang="ts">
import type { Status } from '~~/data/projects'

const { status } = defineProps<{ status: Status }>()

const color: Record<Status, string> = {
  stable: 'text-pn-bright-green',
  active: 'text-pn-cyan',
  alpha: 'text-pn-yellow',
  archived: 'text-pn-muted',
}

const label: Record<Status, string> = {
  stable: 'stable',
  active: 'in development',
  alpha: 'alpha',
  archived: 'archived',
}
</script>

<template>
  <span class="flex shrink-0 items-center gap-1.5 text-xs whitespace-nowrap" :class="color[status]">
    <span aria-hidden="true">●</span>{{ label[status] }}
  </span>
</template>
