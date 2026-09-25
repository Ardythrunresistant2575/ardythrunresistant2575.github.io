<script setup lang="ts">
const route = useRoute()

// The wallpaper is a home-page treatment. Elsewhere the ground stays flat.
const onHome = computed(() => route.path === '/' || route.path === '')

/**
 * Two masks, intersected: the wallpaper fades out at the bottom into the flat
 * ground, and fades out to the LEFT so it never sits under the hero copy. The
 * disc is a backdrop on the right-hand side, not a wash behind the text.
 */
const FADE = [
  'linear-gradient(to bottom, black 0%, black 52%, transparent 100%)',
  'linear-gradient(to right, transparent 0%, transparent 46%, black 78%)',
].join(', ')
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-pn-bg">
    <!-- Omarchy's Paleday wallpaper, behind the masthead and the hero together.
         Masked rather than faded with an overlay, so the ground shows through
         underneath instead of a translucent sheet sitting on top of it. -->
    <div
      v-if="onHome"
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-no-repeat sm:h-[42rem]"
      :style="{
        backgroundImage: 'url(/bg/hero.webp)',
        backgroundSize: 'auto 88%',
        backgroundPosition: '104% 26%',
        maskImage: FADE,
        WebkitMaskImage: FADE,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }"
    />

    <SiteHeader :transparent="onHome" />
    <main class="relative flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
