<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex flex-col">
    <!-- title bar -->
    <div
      class="flex items-center gap-3 border-b border-grid bg-ink-900 px-5 py-2.5"
    >
      <span
        aria-hidden="true"
        class="h-2.5 w-2.5 shrink-0 border border-primary-500 bg-primary-500/30"
      />
      <span
        class="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.3em] text-cream"
      >
        {{ title }}
      </span>
      <span aria-hidden="true" class="h-px flex-1 bg-grid" />
      <span
        aria-hidden="true"
        class="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-muted"
      >
        <span class="border border-grid px-1 leading-none">_</span>
        <span class="border border-grid px-1 leading-none">□</span>
        <span class="border border-grid px-1 leading-none">✕</span>
      </span>
    </div>

    <slot />
  </div>
</template>
