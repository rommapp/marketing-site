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
    <!-- Figure plate: photo cut out and pasted onto the page -->
    <div class="plate overflow-hidden">
      <div class="relative overflow-hidden bg-white p-2 sm:p-3">
        <Transition name="gallery-fade" mode="out-in">
          <img
            v-if="current"
            :key="active"
            :src="current.src"
            :alt="current.alt"
            class="block aspect-[16/10] w-full cursor-zoom-in rounded-md bg-ink object-fill"
            loading="lazy"
            @click="emit('select', current!)"
          />
        </Transition>
      </div>
      <div
        class="flex items-center justify-between border-t-2 border-ink/10 bg-paper px-3 py-2"
      >
        <span
          class="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-700"
        >
          {{ label }}
        </span>
        <span
          v-if="current"
          class="truncate pl-3 font-serif text-xs italic text-ink-soft"
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
        class="h-3 w-3 rounded-full border-2 border-ink transition-colors"
        :class="i === active ? 'bg-sun-500' : 'bg-white hover:bg-sun-300'"
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
