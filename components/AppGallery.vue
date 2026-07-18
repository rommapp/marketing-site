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
    <!-- A mounted figure plate -->
    <div class="panel overflow-hidden">
      <div class="relative overflow-hidden bg-paper-card p-2 sm:p-3">
        <Transition name="gallery-fade" mode="out-in">
          <img
            v-if="current"
            :key="active"
            :src="current.src"
            :alt="current.alt"
            class="block aspect-[16/10] w-full cursor-zoom-in border border-ink/15 bg-ink object-fill"
            loading="lazy"
            @click="emit('select', current!)"
          />
        </Transition>
      </div>
      <div
        class="flex items-baseline justify-between gap-3 border-t border-ink/15 px-3.5 py-2"
      >
        <span
          class="whitespace-nowrap font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-vermilion-600"
        >
          {{ label }}
        </span>
        <span
          v-if="current"
          class="truncate font-serif text-xs italic text-ink-soft"
        >
          {{ current.alt }}
        </span>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-center gap-2.5">
      <button
        v-for="(image, i) in images"
        :key="image.src"
        type="button"
        class="h-2.5 w-2.5 rounded-full border border-ink/50 transition-colors"
        :class="i === active ? 'bg-ink' : 'bg-paper-card hover:bg-ink/20'"
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
