<script setup lang="ts">
const nav = [
  { label: 'projects', to: '/projects' },
  { label: 'about', to: '/#about' },
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-pn-bg">
    <div class="mx-auto flex h-14 max-w-4xl items-center gap-5 px-5 sm:px-6">
      <NuxtLink to="/" class="flex items-center gap-2.5 text-sm" aria-label="Basic Automation — home">
        <BrandMark alt="" class="h-5 w-5 shrink-0" />
        <span class="text-pn-fg-bright">basic<span class="text-pn-accent">automation</span></span>
      </NuxtLink>

      <nav class="ml-auto flex items-center gap-5 text-xs sm:gap-6">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-pn-muted transition-colors hover:text-pn-fg-bright"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          href="https://github.com/basic-automation"
          target="_blank"
          rel="noreferrer noopener"
          class="text-pn-muted transition-colors hover:text-pn-fg-bright"
        >
          github
        </a>
      </nav>
    </div>
  </header>
</template>
