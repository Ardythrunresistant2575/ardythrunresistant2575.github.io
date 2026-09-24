<script setup lang="ts">
/**
 * The organization's mark, as it appears on github.com/basic-automation —
 * a black tile with the wordmark knocked out, so it needs no recolouring.
 */
const { alt = '' } = defineProps<{ alt?: string }>()
</script>

<template>
  <img src="/logo.png" :alt="alt" width="512" height="512" decoding="async">
</template>
