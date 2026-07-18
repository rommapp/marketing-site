<template>
  <!-- Wireframe globe with an orbiting data ring — pure SVG, no scripts -->
  <svg aria-hidden="true" viewBox="0 0 480 480" fill="none" class="wire-globe">
    <defs>
      <linearGradient id="wg-stroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#4CC9FF" />
        <stop offset="100%" stop-color="#8B74E8" />
      </linearGradient>
      <radialGradient id="wg-core" cx="50%" cy="42%" r="60%">
        <stop offset="0%" stop-color="rgba(76,201,255,0.14)" />
        <stop offset="60%" stop-color="rgba(139,116,232,0.06)" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
    </defs>

    <!-- inner atmosphere glow -->
    <circle cx="240" cy="240" r="150" fill="url(#wg-core)" />

    <!-- globe wireframe -->
    <g stroke="url(#wg-stroke)" stroke-width="1">
      <circle cx="240" cy="240" r="150" />
      <!-- parallels -->
      <ellipse cx="240" cy="165" rx="124" ry="34" opacity="0.6" />
      <ellipse cx="240" cy="240" rx="150" ry="42" opacity="0.7" />
      <ellipse cx="240" cy="315" rx="124" ry="34" opacity="0.6" />
      <!-- meridians -->
      <ellipse cx="240" cy="240" rx="52" ry="150" opacity="0.55" />
      <ellipse cx="240" cy="240" rx="104" ry="150" opacity="0.55" />
      <line x1="240" y1="90" x2="240" y2="390" opacity="0.55" />
    </g>

    <!-- orbit ring with a travelling signal dash -->
    <g class="wg-orbit">
      <ellipse
        cx="240"
        cy="240"
        rx="212"
        ry="64"
        stroke="rgba(76,201,255,0.35)"
        stroke-width="1"
      />
      <ellipse
        class="wg-signal"
        cx="240"
        cy="240"
        rx="212"
        ry="64"
        stroke="#4CC9FF"
        stroke-width="2"
        stroke-linecap="round"
      />
    </g>

    <!-- uplink nodes -->
    <circle class="wg-node" cx="146" cy="152" r="3" fill="#4CC9FF" />
    <circle
      class="wg-node wg-node-late"
      cx="352"
      cy="204"
      r="3"
      fill="#A494EB"
    />
    <circle class="wg-node" cx="262" cy="352" r="3" fill="#8FE1FF" />
  </svg>
</template>

<style scoped>
.wire-globe {
  display: block;
}

.wg-orbit {
  transform-origin: 240px 240px;
  transform: rotate(-16deg);
}

/* ellipse perimeter ≈ 916px: one short glowing dash orbiting the globe */
.wg-signal {
  stroke-dasharray: 70 846;
  filter: drop-shadow(0 0 4px rgba(76, 201, 255, 0.9));
  animation: wg-orbit-travel 9s linear infinite;
}

@keyframes wg-orbit-travel {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -916;
  }
}

.wg-node {
  filter: drop-shadow(0 0 5px currentColor);
  animation: wg-node-pulse 3.2s ease-in-out infinite;
}

.wg-node-late {
  animation-delay: -1.6s;
}

@keyframes wg-node-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wg-signal,
  .wg-node {
    animation: none;
  }
}
</style>
