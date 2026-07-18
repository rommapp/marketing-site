<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    title: string;
    subtitle?: string;
    chapter?: string;
    prefix?: string;
  }>(),
  { prefix: "Chapter" },
);
</script>

<template>
  <div class="text-center">
    <div class="flex items-center justify-center gap-5">
      <span aria-hidden="true" class="h-px w-12 bg-ink/25 sm:w-20" />
      <span class="kicker whitespace-nowrap text-ink-faint">
        <span v-if="chapter" class="text-vermilion-600">
          {{ prefix }} {{ chapter }}
        </span>
        <span v-if="chapter" aria-hidden="true" class="mx-1.5">·</span>
        <span>{{ label }}</span>
      </span>
      <span aria-hidden="true" class="h-px w-12 bg-ink/25 sm:w-20" />
    </div>
    <h2
      class="mx-auto mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mx-auto mt-5 max-w-2xl font-serif text-base italic leading-relaxed text-ink-soft sm:text-lg"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
