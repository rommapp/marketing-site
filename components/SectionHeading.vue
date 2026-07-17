<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon :icon="faGamepad" class="text-grid" size="lg" />
    </div>
    <h2
      class="mt-6 font-pixel text-2xl uppercase leading-snug text-cream sm:text-3xl md:text-4xl"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 max-w-2xl leading-relaxed text-muted">
      {{ subtitle }}
    </p>
  </div>
</template>
