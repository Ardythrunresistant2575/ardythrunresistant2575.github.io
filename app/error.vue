<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

useHead({ title: `${error.statusCode} — basic automation` })
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto max-w-4xl px-5 py-24 sm:px-6">
      <p class="text-xs text-pn-muted">
        <span class="text-pn-accent">basic-automation</span>@github
        <span class="text-pn-rule">:</span>~<span class="text-pn-rule">$</span> cat {{ $route.path }}
      </p>

      <p class="mt-8 text-sm text-pn-red">
        {{ error.statusCode }}: {{ error.statusCode === 404 ? 'no such file or directory' : 'internal error' }}
      </p>

      <h1 class="mt-6 text-2xl text-pn-fg-bright sm:text-3xl">
        {{ error.statusCode === 404 ? "There's nothing here" : 'Something went wrong' }}
      </h1>

      <p class="mt-4 max-w-xl text-sm leading-relaxed text-pn-dim">
        {{
          error.statusCode === 404
            ? 'That page has either moved or never existed. The projects are all still where you left them.'
            : (error.statusMessage || 'An unexpected error occurred.')
        }}
      </p>

      <NuxtLink
        to="/"
        class="mt-9 inline-block text-sm text-pn-accent transition-colors hover:text-pn-bright-magenta"
      >
        → cd ~
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
