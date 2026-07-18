<script setup lang="ts">
// Decorative auto-spinning 3D game box. Adapted from RomM's frontend RBox3D
// component (github.com/rommapp .../v2/lib/media/RBox3D/RBox3D.vue), reduced to
// a display-only spinner — no pointer, keyboard, or gamepad interaction.
import { computed, onBeforeUnmount, onMounted, ref, type Ref } from "vue";

defineOptions({ inheritAttrs: false });

interface Props {
  front: string;
  back: string;
  spine: string;
  alt?: string;
  autoSpin?: boolean;
  initialYaw?: number;
  initialPitch?: number;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  autoSpin: true,
  initialYaw: 32,
  initialPitch: -6,
});

const emit = defineEmits<{
  error: [];
}>();

const AUTO_SPIN_SPEED = 0.18;
const DEFAULT_FRONT_RATIO = 0.715;
const DEFAULT_SPINE_RATIO = 0.12;
const MAX_SPINE_RATIO = 0.3;

const rootEl = ref<HTMLElement | null>(null);
const frontImg = ref<HTMLImageElement | null>(null);
const spineImg = ref<HTMLImageElement | null>(null);

const yaw = ref(props.initialYaw);
const pitch = ref(props.initialPitch);

const widthPx = ref(0);
const frontRatio = ref(DEFAULT_FRONT_RATIO);
const spineRatio = ref(DEFAULT_SPINE_RATIO);
const spineLandscape = ref(false);

const heightPx = computed(() =>
  frontRatio.value > 0 ? widthPx.value / frontRatio.value : 0,
);

const depthPx = computed(
  () =>
    (spineLandscape.value ? widthPx.value : heightPx.value) * spineRatio.value,
);

// Inlined reduced-motion check (replaces RomM's useReducedMotion composable).
const reducedMotion = ref(false);
let motionMq: MediaQueryList | null = null;
const syncReducedMotion = () => {
  reducedMotion.value = motionMq?.matches ?? false;
};

let rafId = 0;

function tick() {
  if (props.autoSpin && !reducedMotion.value) {
    yaw.value += AUTO_SPIN_SPEED;
  }
  rafId = requestAnimationFrame(tick);
}

function measureRatio(img: HTMLImageElement | null, target: Ref<number>) {
  if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
    target.value = img.naturalWidth / img.naturalHeight;
  }
}

function measureSpine(img: HTMLImageElement | null) {
  if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    spineLandscape.value = w > h;
    spineRatio.value = Math.min(
      Math.min(w, h) / Math.max(w, h),
      MAX_SPINE_RATIO,
    );
  }
}

const onFrontLoad = (e: Event) =>
  measureRatio(e.target as HTMLImageElement, frontRatio);
const onSpineLoad = (e: Event) => measureSpine(e.target as HTMLImageElement);

let ro: ResizeObserver | null = null;

onMounted(() => {
  motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncReducedMotion();
  motionMq.addEventListener("change", syncReducedMotion);

  const root = rootEl.value;
  if (root) {
    widthPx.value = root.clientWidth;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect.width ?? 0;
        if (w > 0) widthPx.value = w;
      });
      ro.observe(root);
    }
  }
  measureRatio(frontImg.value, frontRatio);
  measureSpine(spineImg.value);
  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  motionMq?.removeEventListener("change", syncReducedMotion);
  ro?.disconnect();
  cancelAnimationFrame(rafId);
});

const boxStyle = computed(() => ({
  transform: `rotateX(${pitch.value}deg) rotateY(${yaw.value}deg)`,
}));

const px = (n: number) => `${n}px`;

const frontStyle = computed(() => ({
  width: px(widthPx.value),
  height: px(heightPx.value),
  transform: `translate(-50%, -50%) translateZ(${depthPx.value / 2}px)`,
}));

const backStyle = computed(() => ({
  width: px(widthPx.value),
  height: px(heightPx.value),
  transform: `translate(-50%, -50%) rotateY(180deg) translateZ(${depthPx.value / 2}px)`,
}));

const leftStyle = computed(() => {
  const alt = spineLandscape.value;
  return {
    width: px(alt ? heightPx.value : depthPx.value),
    height: px(alt ? depthPx.value : heightPx.value),
    transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${widthPx.value / 2}px)${alt ? " rotate(90deg)" : ""}`,
  };
});

const rightStyle = computed(() => {
  const alt = spineLandscape.value;
  return {
    width: px(alt ? heightPx.value : depthPx.value),
    height: px(alt ? depthPx.value : heightPx.value),
    transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${widthPx.value / 2}px)${alt ? " rotate(90deg)" : ""}`,
  };
});

const topStyle = computed(() => {
  const alt = !spineLandscape.value;
  return {
    width: px(alt ? depthPx.value : widthPx.value),
    height: px(alt ? widthPx.value : depthPx.value),
    transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${heightPx.value / 2}px)${alt ? " rotate(90deg)" : ""}`,
  };
});

const bottomStyle = computed(() => {
  const alt = !spineLandscape.value;
  return {
    width: px(alt ? depthPx.value : widthPx.value),
    height: px(alt ? widthPx.value : depthPx.value),
    transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${heightPx.value / 2}px)${alt ? " rotate(90deg)" : ""}`,
  };
});

const rootStyle = computed(() => ({ aspectRatio: String(frontRatio.value) }));
</script>

<template>
  <div
    ref="rootEl"
    v-bind="$attrs"
    class="r-box3d"
    role="img"
    :aria-label="alt"
    :style="rootStyle"
  >
    <div class="r-box3d__shadow" />
    <div class="r-box3d__stage">
      <div class="r-box3d__box" :style="boxStyle">
        <img
          ref="frontImg"
          class="r-box3d__face r-box3d__face--art"
          :src="front"
          :alt="alt"
          :style="frontStyle"
          draggable="false"
          @load="onFrontLoad"
          @error="emit('error')"
        />
        <img
          class="r-box3d__face r-box3d__face--art"
          :src="back"
          alt=""
          :style="backStyle"
          draggable="false"
        />
        <img
          ref="spineImg"
          class="r-box3d__face r-box3d__face--art"
          :src="spine"
          alt=""
          :style="leftStyle"
          draggable="false"
          @load="onSpineLoad"
        />
        <img
          class="r-box3d__face r-box3d__face--art"
          :src="spine"
          alt=""
          :style="rightStyle"
          draggable="false"
        />
        <img
          class="r-box3d__face r-box3d__face--art"
          :src="spine"
          alt=""
          :style="topStyle"
          draggable="false"
        />
        <img
          class="r-box3d__face r-box3d__face--art"
          :src="spine"
          alt=""
          :style="bottomStyle"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.r-box3d {
  position: relative;
  width: 100%;
  overflow: visible;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}

.r-box3d__shadow {
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: -4%;
  height: 10%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, black 38%, transparent),
    transparent 70%
  );
  filter: blur(6px);
  pointer-events: none;
}

.r-box3d__stage {
  position: absolute;
  inset: 0;
  perspective: 1400px;
  display: grid;
  place-items: center;
}

.r-box3d__box {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
}

.r-box3d__face {
  position: absolute;
  top: 50%;
  left: 50%;
  backface-visibility: hidden;
  border-radius: 2px;
  overflow: hidden;
  pointer-events: none;
}

.r-box3d__face--art {
  display: block;
  object-fit: cover;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, black 18%, transparent);
}
</style>
