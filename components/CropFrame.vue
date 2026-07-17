<template>
  <div class="relative">
    <span
      v-for="corner in corners"
      :key="corner"
      aria-hidden="true"
      class="absolute z-10 h-1.5 w-1.5 bg-cream/70"
      :class="{
        '-left-[3px] -top-[3px]': corner === 'tl',
        '-right-[3px] -top-[3px]': corner === 'tr',
        '-bottom-[3px] -left-[3px]': corner === 'bl',
        '-bottom-[3px] -right-[3px]': corner === 'br',
      }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
const corners = ["tl", "tr", "bl", "br"] as const;
</script>
