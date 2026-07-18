<script setup lang="ts">
// A faint chartroom backdrop: an engraved globe, an orbit, and scattered
// register marks. Positions come from a seeded LCG so server and client
// render the exact same field, with no hydration drift.
let seed = 1897;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

const marks = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  top: `${6 + Math.floor(rand() * 88)}%`,
  left: `${2 + Math.floor(rand() * 96)}%`,
  opacity: 0.05 + rand() * 0.08,
  gold: rand() > 0.75,
}));
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <!-- engraved globe, lower right -->
    <svg
      class="absolute -bottom-24 -right-16 h-[26rem] w-[26rem] text-ink"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g stroke="currentColor" stroke-width="0.75" opacity="0.07">
        <circle cx="100" cy="100" r="88" />
        <ellipse cx="100" cy="100" rx="88" ry="34" />
        <ellipse cx="100" cy="100" rx="62" ry="88" />
        <ellipse cx="100" cy="100" rx="30" ry="88" />
        <line x1="12" y1="100" x2="188" y2="100" />
        <line x1="100" y1="12" x2="100" y2="188" />
      </g>
      <circle
        cx="100"
        cy="100"
        r="96"
        stroke="#B79233"
        stroke-width="0.5"
        opacity="0.18"
      />
    </svg>

    <!-- orbit arc, upper left -->
    <svg
      class="absolute -left-24 -top-28 h-96 w-96 text-ink"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g stroke="currentColor" stroke-width="0.75" opacity="0.06">
        <circle cx="100" cy="100" r="70" />
        <ellipse
          cx="100"
          cy="100"
          rx="96"
          ry="38"
          transform="rotate(-18 100 100)"
        />
      </g>
    </svg>

    <!-- scattered register marks -->
    <svg
      v-for="m in marks"
      :key="m.id"
      class="absolute h-3 w-3"
      :class="m.gold ? 'text-gold-500' : 'text-ink'"
      :style="{ top: m.top, left: m.left, opacity: m.opacity }"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1" />
    </svg>
  </div>
</template>
