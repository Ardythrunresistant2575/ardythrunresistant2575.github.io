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

      <nav class="ml-auto flex items-center gap-4 text-xs sm:gap-5">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-pn-muted transition-colors hover:text-pn-fg-bright"
        >
          <span aria-hidden="true" class="text-pn-rule">[</span>{{ item.label }}<span
            aria-hidden="true" class="text-pn-rule"
          >]</span>
        </NuxtLink>
        <a
          href="https://github.com/basic-automation"
          target="_blank"
          rel="noreferrer noopener"
          class="text-pn-muted transition-colors hover:text-pn-fg-bright"
        >
          <span aria-hidden="true" class="text-pn-rule">[</span>github<span
            aria-hidden="true" class="text-pn-rule"
          >]</span>
        </a>
      </nav>
    </div>
    <div aria-hidden="true" class="mx-auto max-w-4xl px-5 sm:px-6">
      <div class="rule-dashed" />
    </div>
  </header>
</template>
