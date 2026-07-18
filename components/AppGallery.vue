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
const current = computed<AppImage | undefined>(
  () => props.images[active.value],
);
let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  timer = setInterval(() => {
    if (!paused.value) {
      const next = (active.value + 1) % props.images.length;
      active.value = next;
      if (next === 0) emit("cycled");
    }
  }, 4000);
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <div @mouseenter="paused = true" @mouseleave="paused = false">
    <!-- inset player screen -->
    <div
      class="relative overflow-hidden rounded-xl border-2 border-chrome-300 bg-primary-950 p-1.5 shadow-screen"
    >
      <Transition name="gallery-fade" mode="out-in">
        <img
          v-if="current"
          :key="active"
          :src="current.src"
          :alt="current.alt"
          class="block aspect-[16/10] w-full cursor-zoom-in rounded-lg bg-primary-950 object-fill"
          loading="lazy"
          @click="emit('select', current!)"
        />
      </Transition>
      <!-- glossy screen reflection -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-gradient-to-b from-white/25 to-transparent"
      />
    </div>
    <div class="mt-3 flex items-center justify-between">
      <span
        class="font-tech text-[10px] font-bold uppercase tracking-[0.25em] text-ink-faint"
      >
        {{ label }}
      </span>
      <span class="flex items-center gap-2">
        <button
          v-for="(image, i) in images"
          :key="image.src"
          type="button"
          class="h-3 w-3 rounded-full transition-all"
          :style="
            i === active
              ? {
                  background:
                    'radial-gradient(circle at 35% 30%, #a6e4ff, #00a8e8 70%)',
                  boxShadow: '0 0 8px rgba(0,168,232,0.8)',
                }
              : {
                  background:
                    'radial-gradient(circle at 35% 30%, #ffffff, #c2d2de 70%)',
                }
          "
          :aria-label="`Show ${image.alt}`"
          @click="active = i"
        />
      </span>
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
</style>
