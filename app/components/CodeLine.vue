<script setup lang="ts">
const { code } = defineProps<{ code: string }>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1600)
  }
  catch {
    // Clipboard unavailable (insecure context, denied permission) — the command
    // is on screen to select by hand.
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="flex items-center gap-4 bar" style="--accent: var(--color-pn-rule)">
    <code class="flex-1 overflow-x-auto py-1 text-sm text-pn-green prompt">{{ code }}</code>
    <button
      type="button"
      class="shrink-0 text-xs text-pn-muted transition-colors hover:text-pn-fg-bright"
      :aria-label="`Copy: ${code}`"
      @click="copy"
    >
      {{ copied ? '[copied]' : '[copy]' }}
    </button>
  </div>
</template>
