<script setup lang="ts">
defineProps<{
  label: string;
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div>
    <div
      class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary-400"
    >
      <span>{{ label }}</span>
      <span aria-hidden="true" class="h-px flex-1 bg-grid" />
      <span aria-hidden="true" class="hidden text-grid sm:block">////////</span>
    </div>
    <h2
      class="mt-6 font-pixel text-2xl font-bold uppercase leading-snug text-cream sm:text-3xl md:text-4xl"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 max-w-2xl leading-relaxed text-muted">
      {{ subtitle }}
    </p>
  </div>
</template>
