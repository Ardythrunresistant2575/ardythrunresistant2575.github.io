<template>
  <!--
    The CRT displacement filter. Rendered once, hidden, and referenced by
    `.crt-glass` through `backdrop-filter: url(#crt-warp)` — which is the only
    way to get at live DOM behind an element. A canvas shader cannot see the
    page behind it without re-rendering the page into itself first.

    The turbulence is deliberately lopsided: a very low frequency across X and
    a high one down Y produces horizontal bands, so displacing against it
    smears the backdrop ALONG the scanlines rather than in all directions —
    the way a misaligned tube pulls an image sideways. The animation walks the
    frequency and the seed so the warp never settles.
  -->
  <svg class="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
    <defs>
      <filter id="crt-warp" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
        <feTurbulence
          type="fractalNoise"
          base-frequency="0.0014 0.34"
          num-octaves="1"
          seed="11"
          result="bands"
        >
          <animate
            attributeName="baseFrequency"
            dur="11s"
            values="0.0014 0.34; 0.0031 0.26; 0.0009 0.41; 0.0014 0.34"
            repeatCount="indefinite"
          />
          <animate
            attributeName="seed"
            dur="7s"
            values="11; 14; 9; 11"
            repeatCount="indefinite"
          />
        </feTurbulence>

        <!-- R drives the horizontal smear. B is near-flat in fractal noise, so
             using it for Y keeps vertical drift to a shiver instead of a wobble. -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="bands"
          scale="14"
          x-channel-selector="R"
          y-channel-selector="B"
        >
          <animate
            attributeName="scale"
            dur="5.5s"
            values="14; 20; 11; 14"
            repeatCount="indefinite"
          />
        </feDisplacementMap>
      </filter>
    </defs>
  </svg>
</template>
