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
        <img
          v-if="current"
          :key="active"
          :src="current.src"
          :alt="current.alt"
          class="block aspect-[16/10] w-full cursor-zoom-in bg-ink-950 object-fill"
          loading="lazy"
          @click="emit('select', current!)"
        />
      </Transition>
    </div>
    <div class="mt-3 flex items-center justify-center gap-2">
      <button
        v-for="(image, i) in images"
        :key="image.src"
        type="button"
        class="h-2 w-2 transition-colors"
        :class="i === active ? 'bg-primary-400' : 'bg-grid hover:bg-muted'"
        :aria-label="`Show ${image.alt}`"
        @click="active = i"
      />
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
