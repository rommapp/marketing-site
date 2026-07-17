<script setup lang="ts">
// Scattered terminal glyphs (Phantom-style). Positions come from a seeded
// LCG so server and client render the exact same field, with no hydration drift.
const GLYPHS = ["+", "x", "=", "#", "0", "1", "░", "▒", "@"];

let seed = 1337;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

const glyphs = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  char: GLYPHS[Math.floor(rand() * GLYPHS.length)],
  top: `${Math.floor(rand() * 96)}%`,
  left: `${Math.floor(rand() * 98)}%`,
  opacity: 0.06 + rand() * 0.2,
  size: rand() > 0.85 ? "text-sm" : "text-xs",
}));
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <span
      v-for="g in glyphs"
      :key="g.id"
      class="absolute select-none font-mono text-primary-200"
      :class="g.size"
      :style="{ top: g.top, left: g.left, opacity: g.opacity }"
    >
      {{ g.char }}
    </span>
  </div>
</template>
