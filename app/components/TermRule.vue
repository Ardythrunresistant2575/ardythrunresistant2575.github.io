<script setup lang="ts">
/** A labelled separator: `── label ────────────────────`, as a TUI draws one. */
const { label } = defineProps<{ label?: string }>()
</script>

<template>
  <div class="flex items-center gap-3 select-none">
    <span aria-hidden="true" class="w-6 rule-dashed" />
    <span v-if="label" class="shrink-0 text-xs tracking-widest text-pn-muted lowercase">
      {{ label }}
    </span>
    <span aria-hidden="true" class="flex-1 rule-dashed" />
  </div>
</template>
