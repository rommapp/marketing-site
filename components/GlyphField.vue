<script setup lang="ts">
// Floating bubbles and sparkles. Positions come from a seeded LCG so
// server and client render the exact same field, with no hydration drift.
const SPARKLES = ["✦", "✧", "＋"];
const SPARKLE_COLORS = [
  "text-primary-400",
  "text-magenta-400",
  "text-violet2-400",
  "text-lime-500",
];

let seed = 2001;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

const sparkles = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  char: SPARKLES[Math.floor(rand() * SPARKLES.length)],
  color: SPARKLE_COLORS[Math.floor(rand() * SPARKLE_COLORS.length)],
  top: `${Math.floor(rand() * 96)}%`,
  left: `${Math.floor(rand() * 98)}%`,
  opacity: 0.25 + rand() * 0.5,
  size: rand() > 0.8 ? "text-2xl" : "text-sm",
  delay: `${(rand() * 2.4).toFixed(2)}s`,
}));

const bubbles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top: `${Math.floor(rand() * 90)}%`,
  left: `${Math.floor(rand() * 96)}%`,
  size: `${Math.floor(14 + rand() * 46)}px`,
  opacity: 0.15 + rand() * 0.3,
  delay: `${(rand() * 5).toFixed(2)}s`,
}));
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <span
      v-for="b in bubbles"
      :key="`b${b.id}`"
      class="animate-float absolute rounded-full"
      :style="{
        top: b.top,
        left: b.left,
        width: b.size,
        height: b.size,
        opacity: b.opacity,
        animationDelay: b.delay,
        background:
          'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(166,228,255,0.5) 45%, rgba(0,168,232,0.25) 100%)',
        boxShadow: 'inset -2px -3px 6px rgba(0,108,158,0.25)',
      }"
    />
    <span
      v-for="g in sparkles"
      :key="`s${g.id}`"
      class="animate-twinkle absolute select-none"
      :class="[g.size, g.color]"
      :style="{
        top: g.top,
        left: g.left,
        opacity: g.opacity,
        animationDelay: g.delay,
      }"
    >
      {{ g.char }}
    </span>
  </div>
</template>
