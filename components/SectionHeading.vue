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
  <div>
    <div class="flex items-center gap-4">
      <span
        v-if="chapter"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun-500 font-display text-xl font-bold text-ink shadow-plate-sm"
      >
        {{ chapter }}
      </span>
      <div class="min-w-0 flex-1">
        <div
          class="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-primary-600"
        >
          {{ chapter ? `${prefix} ${chapter} · ` : "" }}{{ label }}
        </div>
        <div class="rainbow-rule mt-2 max-w-xs rounded-full" />
      </div>
    </div>
    <h2
      class="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
