<script setup lang="ts">
/**
 * `transparent` lets the home page's wallpaper show through the masthead. The
 * moment the page scrolls, the ground comes back underneath — otherwise mono
 * text would pass under the nav with nothing to separate it.
 */
const { transparent = false } = defineProps<{ transparent?: boolean }>()

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 24)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const solid = computed(() => !transparent || scrolled.value)

const nav = [
  { label: 'projects', to: '/projects' },
  { label: 'about', to: '/#about' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-200"
    :class="solid ? 'bg-pn-bg' : 'bg-transparent'"
  >
    <div class="mx-auto flex h-32 max-w-7xl items-center gap-5 px-5 sm:px-6">
      <NuxtLink to="/" class="flex items-center" aria-label="Basic Automation — home">
        <BrandMark title="Basic Automation" class="h-24 w-24 shrink-0 text-pn-fg" />
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
