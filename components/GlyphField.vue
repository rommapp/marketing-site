<script setup lang="ts">
// Scattered classroom-poster shapes. Positions come from a seeded LCG so
// server and client render the exact same field, with no hydration drift.
const GLYPHS = ["✶", "✦", "●", "▲", "■", "✚", "☆", "◆"];
const COLORS = [
  "text-primary-500",
  "text-cerulean-500",
  "text-sun-500",
  "text-kelly-500",
  "text-tomato-500",
  "text-grape-500",
];

let seed = 1337;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

const glyphs = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  char: GLYPHS[Math.floor(rand() * GLYPHS.length)],
  color: COLORS[Math.floor(rand() * COLORS.length)],
  top: `${Math.floor(rand() * 96)}%`,
  left: `${Math.floor(rand() * 98)}%`,
  opacity: 0.12 + rand() * 0.28,
  rotate: `${Math.floor(rand() * 60) - 30}deg`,
  size: rand() > 0.8 ? "text-2xl" : "text-base",
  twinkle: rand() > 0.75,
  delay: `${(rand() * 2.5).toFixed(2)}s`,
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
      class="absolute select-none"
      :class="[g.size, g.color, g.twinkle ? 'animate-twinkle' : '']"
      :style="{
        top: g.top,
        left: g.left,
        opacity: g.opacity,
        transform: `rotate(${g.rotate})`,
        animationDelay: g.delay,
      }"
    >
      {{ g.char }}
    </span>
  </div>
</template>
