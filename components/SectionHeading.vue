<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div>
    <h2
      class="font-pixel text-2xl uppercase leading-snug text-cream sm:text-3xl md:text-4xl"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 max-w-2xl leading-relaxed text-muted">
      {{ subtitle }}
    </p>
  </div>
</template>
