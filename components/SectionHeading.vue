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
      class="glass-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-tech text-[11px] font-bold uppercase tracking-[0.3em] text-primary-600"
    >
      <span
        aria-hidden="true"
        class="h-2 w-2 rounded-full"
        style="
          background: radial-gradient(circle at 35% 30%, #a6e4ff, #00a8e8 70%);
        "
      />
      {{ label }}
    </div>
    <h2
      class="mt-6 font-display text-2xl leading-snug text-ink sm:text-3xl md:text-4xl"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 max-w-2xl leading-relaxed text-ink-soft">
      {{ subtitle }}
    </p>
  </div>
</template>
