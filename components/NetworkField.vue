<script setup lang="ts">
// Constellation of network nodes joined by faint links. Positions come from a
// seeded LCG so server and client render the exact same field, with no
// hydration drift.
let seed = 1337;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
  opacity: number;
}

const nodes: Node[] = Array.from({ length: 34 }, (_, i) => ({
  id: i,
  x: 2 + rand() * 96,
  y: 4 + rand() * 92,
  r: rand() > 0.85 ? 2.4 : 1.4,
  opacity: 0.25 + rand() * 0.5,
}));

// Join each node to its nearest neighbour (viewBox is 100×56, so squash the
// y-distance to judge proximity in on-screen space).
const links = nodes.flatMap((a) => {
  let best: Node | undefined;
  let bestDist = Infinity;
  for (const b of nodes) {
    if (b.id <= a.id) continue;
    const d = (a.x - b.x) ** 2 + ((a.y - b.y) * 0.56) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = b;
    }
  }
  return best && bestDist < 500 ? [{ a, b: best }] : [];
});
</script>

<template>
  <svg
    aria-hidden="true"
    viewBox="0 0 100 56"
    preserveAspectRatio="xMidYMid slice"
    class="pointer-events-none absolute inset-0 h-full w-full"
  >
    <line
      v-for="(link, i) in links"
      :key="i"
      :x1="link.a.x"
      :y1="link.a.y"
      :x2="link.b.x"
      :y2="link.b.y"
      stroke="rgba(76,201,255,0.12)"
      stroke-width="0.12"
    />
    <circle
      v-for="node in nodes"
      :key="node.id"
      :cx="node.x"
      :cy="node.y"
      :r="node.r * 0.16"
      :fill="node.r > 2 ? '#4CC9FF' : '#A494EB'"
      :opacity="node.opacity"
    />
  </svg>
</template>
