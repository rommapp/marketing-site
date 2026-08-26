<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

interface AppImage {
  src: string;
  alt: string;
}

const props = defineProps<{
  images: AppImage[];
  label: string;
}>();

const emit = defineEmits<{
  select: [image: AppImage];
  // Fired when the carousel auto-advances back to the first image (full loop)
  cycled: [];
}>();

const active = ref(0);
const paused = ref(false);
const reducedMotion = ref(false);
const current = computed<AppImage | undefined>(
  () => props.images[active.value],
);
let timer: ReturnType<typeof setInterval> | undefined;

// Pointer hover, keyboard focus and an explicit reduced-motion preference all
// stop the rotation; without the last one the shots kept swapping under a
// visitor who asked the OS for no movement.
const held = computed(() => paused.value || reducedMotion.value);

let motionMq: MediaQueryList | null = null;
const syncReducedMotion = () => {
  reducedMotion.value = motionMq?.matches ?? false;
};

onMounted(() => {
  motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncReducedMotion();
  motionMq.addEventListener("change", syncReducedMotion);

  timer = setInterval(() => {
    if (!held.value) {
      const next = (active.value + 1) % props.images.length;
      active.value = next;
      if (next === 0) emit("cycled");
    }
  }, 4000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
  motionMq?.removeEventListener("change", syncReducedMotion);
});
</script>

<template>
  <div
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <!-- Terminal chrome -->
    <div
      class="flex items-center justify-between border border-grid bg-ink-800 px-3 py-2"
    >
      <div class="flex items-center gap-1.5" aria-hidden="true">
        <span class="h-2 w-2 bg-primary-500" />
        <span class="h-2 w-2 bg-primary-700" />
        <span class="h-2 w-2 bg-grid" />
      </div>
      <span class="font-mono text-[10px] uppercase tracking-widest text-muted">
        {{ label }}
      </span>
    </div>
    <div
      class="relative overflow-hidden border border-t-0 border-grid bg-ink-900"
    >
      <Transition name="gallery-fade" mode="out-in">
        <button
          v-if="current"
          :key="active"
          type="button"
          class="block w-full cursor-zoom-in"
          :aria-label="`Enlarge ${current.alt}`"
          @click="emit('select', current!)"
        >
          <img
            :src="current.src"
            :alt="current.alt"
            class="block aspect-[16/10] w-full bg-ink-950 object-contain"
            loading="lazy"
          />
        </button>
      </Transition>
    </div>
    <div class="mt-1 flex items-center justify-center">
      <button
        v-for="(image, i) in images"
        :key="image.src"
        type="button"
        class="group flex h-8 w-8 items-center justify-center"
        :aria-label="`Show ${image.alt}`"
        :aria-current="i === active"
        @click="active = i"
      >
        <span
          aria-hidden="true"
          class="h-2 w-2 transition-colors"
          :class="
            i === active ? 'bg-primary-400' : 'bg-grid group-hover:bg-muted'
          "
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.25s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .gallery-fade-enter-active,
  .gallery-fade-leave-active {
    transition: none;
  }
}
</style>
