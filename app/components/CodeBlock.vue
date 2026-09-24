<script setup lang="ts">
const { code, label } = defineProps<{ code: string, label?: string }>()

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
    // Clipboard unavailable (insecure context, denied permission) — the code is
    // on screen to select by hand.
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <figure class="bar" style="--accent: var(--color-pn-rule)">
    <figcaption
      v-if="label"
      class="flex items-baseline gap-4 pb-2 text-xs text-pn-muted"
    >
      <span class="truncate"># {{ label }}</span>
      <button
        type="button"
        class="ml-auto shrink-0 transition-colors hover:text-pn-fg-bright"
        :aria-label="`Copy ${label}`"
        @click="copy"
      >
        {{ copied ? '[copied]' : '[copy]' }}
      </button>
    </figcaption>
    <pre class="overflow-x-auto text-xs leading-relaxed text-pn-dim sm:text-[0.8rem]"><code>{{ code }}</code></pre>
  </figure>
</template>
