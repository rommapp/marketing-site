<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

defineProps<{
  label: string;
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div>
    <div class="flex items-center gap-3">
      <span
        class="bevel-out inline-flex items-center gap-2.5 rounded-full border border-grid bg-ink-900/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyber-300"
      >
        <span aria-hidden="true" class="led led-on" />
        {{ label }}
      </span>
      <span
        aria-hidden="true"
        class="h-px flex-1 bg-gradient-to-r from-grid via-grid to-transparent"
      />
      <FontAwesomeIcon :icon="faGlobe" class="text-grid" size="lg" />
    </div>
    <h2
      class="mt-6 font-display text-xl uppercase leading-normal text-chrome sm:text-2xl md:text-3xl"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 max-w-2xl leading-relaxed text-muted">
      {{ subtitle }}
    </p>
  </div>
</template>
