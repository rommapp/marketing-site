<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface AppImage {
  src: string;
  alt: string;
}

export interface ConsoleApp {
  id: string;
  name: string;
  system: string;
  logo: string;
  images: AppImage[];
  label: string;
  tags: { text: string; icon?: IconDefinition }[];
  body: string;
  links?: { label: string; items: { text: string; href: string }[] };
  ctaText: string;
  ctaHref: string;
}

const props = defineProps<{ apps: ConsoleApp[] }>();
const emit = defineEmits<{ select: [image: AppImage] }>();

const active = ref(0);
const app = computed(() => props.apps[active.value]!);

// Attract mode: cycle tracks until the visitor interacts, pause on hover
const interacted = ref(false);
const hovered = ref(false);
const reducedMotion = ref(false);

const engage = () => {
  interacted.value = true;
};

const pick = (i: number) => {
  engage();
  active.value = (i + props.apps.length) % props.apps.length;
};

// Attract mode: advance to the next track only once the active track's
// screenshot carousel has cycled through all of its shots.
const onGalleryCycled = () => {
  if (interacted.value || hovered.value || reducedMotion.value) return;
  active.value = (active.value + 1) % props.apps.length;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    e.preventDefault();
    pick(active.value + 1);
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    e.preventDefault();
    pick(active.value - 1);
  } else if (e.key === "Enter") {
    engage();
    window.open(app.value.ctaHref, "_blank", "noopener");
  }
};

onMounted(() => {
  reducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
});
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-chrome-300 bg-white/70 shadow-glass backdrop-blur-md"
  >
    <!-- chrome title bar -->
    <div
      class="chrome-bar flex items-center justify-between gap-3 border-b border-chrome-300 px-4 py-2.5"
    >
      <span class="flex items-center gap-1.5" aria-hidden="true">
        <span
          class="h-3 w-3 rounded-full border border-red-400/60"
          style="
            background: radial-gradient(circle at 35% 30%, #ffb3ab, #f4574a);
          "
        />
        <span
          class="h-3 w-3 rounded-full border border-amber-400/60"
          style="
            background: radial-gradient(circle at 35% 30%, #ffe3a3, #f5b31b);
          "
        />
        <span
          class="h-3 w-3 rounded-full border border-green-500/60"
          style="
            background: radial-gradient(circle at 35% 30%, #b8f5b1, #34c748);
          "
        />
      </span>
      <span class="font-display text-xs tracking-[0.2em] text-ink">
        RomM Player 5.0
      </span>
      <span
        class="hidden font-tech text-[10px] font-bold uppercase tracking-[0.25em] text-ink-faint sm:block"
      >
        ● now streaming
      </span>
    </div>

    <div
      class="pinstripes grid lg:grid-cols-[20rem_1fr]"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <!-- ======== Playlist ======== -->
      <div
        role="tablist"
        aria-label="Choose an app"
        aria-orientation="vertical"
        class="relative flex flex-col border-b border-chrome-300 lg:border-b-0 lg:border-r"
        @keydown="onKeydown"
      >
        <div
          class="border-b border-chrome-200 px-5 py-3 font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-ink-faint"
        >
          Playlist
        </div>

        <button
          v-for="(item, i) in apps"
          :key="item.id"
          type="button"
          role="tab"
          :aria-selected="i === active"
          class="group relative flex items-center gap-4 border-b border-chrome-200 px-5 py-5 text-left transition-all"
          :class="
            i === active
              ? 'bg-gradient-to-r from-primary-100/90 to-transparent'
              : 'hover:bg-white/60'
          "
          @click="pick(i)"
          @focus="engage()"
        >
          <!-- play indicator -->
          <span
            aria-hidden="true"
            class="w-4 shrink-0 text-center font-tech text-sm"
            :class="i === active ? 'text-primary-500' : 'text-chrome-300'"
          >
            {{ i === active ? "▶" : "▹" }}
          </span>
          <span
            class="glass-sm flex h-11 w-11 shrink-0 items-center justify-center !rounded-full transition-all duration-200"
            :class="
              i === active
                ? 'ring-2 ring-primary-400'
                : 'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0'
            "
          >
            <img :src="item.logo" :alt="`${item.name} logo`" class="h-6 w-6" />
          </span>
          <span class="min-w-0 flex-1">
            <span
              class="block font-tech text-base font-bold leading-tight"
              :class="i === active ? 'text-ink' : 'text-ink-soft'"
            >
              {{ item.name }}
            </span>
            <span
              class="mt-0.5 block font-tech text-[9px] font-bold uppercase tracking-[0.25em]"
              :class="i === active ? 'text-primary-600' : 'text-ink-faint'"
            >
              {{ item.system }}
            </span>
          </span>
          <span
            aria-hidden="true"
            class="font-mono text-[10px]"
            :class="i === active ? 'text-primary-500' : 'text-chrome-400'"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </span>
        </button>

        <div
          aria-hidden="true"
          class="hidden flex-1 items-center justify-center gap-2 px-5 py-5 font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-chrome-400 lg:flex"
        >
          ✦ more tracks soon ✦
        </div>
      </div>

      <!-- ======== Now playing ======== -->
      <Transition name="console-fade" mode="out-in">
        <div :key="app.id" class="grid xl:grid-cols-[1.15fr_1fr]">
          <!-- screen -->
          <div
            class="relative border-b border-chrome-300 p-5 sm:p-7 xl:border-b-0 xl:border-r"
          >
            <AppGallery
              class="relative"
              :images="app.images"
              :label="app.label"
              @select="emit('select', $event)"
              @cycled="onGalleryCycled"
            />
          </div>

          <!-- track info -->
          <div class="relative flex flex-col p-6 sm:p-8">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in app.tags"
                :key="tag.text"
                class="glass-sm inline-flex items-center gap-1.5 !rounded-full px-3 py-1 font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-primary-700"
              >
                <FontAwesomeIcon
                  v-if="tag.icon"
                  :icon="tag.icon"
                  class="h-2.5"
                />
                {{ tag.text }}
              </span>
            </div>

            <h3 class="mt-4 font-display text-xl text-ink md:text-2xl">
              {{ app.name }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-ink-soft">
              {{ app.body }}
            </p>

            <!-- link chips (e.g. supported firmwares) -->
            <div v-if="app.links" class="mt-4">
              <span
                class="font-tech text-[9px] font-bold uppercase tracking-[0.3em] text-ink-faint"
              >
                {{ app.links.label }}
              </span>
              <span class="mt-2 flex flex-wrap gap-1.5">
                <a
                  v-for="link in app.links.items"
                  :key="link.text"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  class="rounded-full border border-chrome-300 bg-white/70 px-2.5 py-0.5 font-tech text-[10px] font-bold text-ink-soft transition-colors hover:border-primary-400 hover:text-primary-600"
                >
                  {{ link.text }}
                </a>
              </span>
            </div>

            <a
              :href="app.ctaHref"
              target="_blank"
              rel="noopener"
              class="mt-auto inline-block self-start pt-8"
            >
              <span class="btn-gel">
                <span class="relative">{{ app.ctaText }} →</span>
              </span>
            </a>
          </div>
        </div>
      </Transition>
    </div>

    <!-- status bar -->
    <div
      class="chrome-bar flex flex-wrap items-center justify-between gap-3 border-t border-chrome-300 px-5 py-2 font-tech text-[9px] font-bold uppercase tracking-[0.25em] text-ink-faint"
    >
      <span class="flex items-center gap-4">
        <span> <span class="text-primary-600">↑↓</span> Browse </span>
        <span> <span class="text-primary-600">⏎</span> Launch </span>
        <span class="hidden sm:inline">
          <span class="text-primary-600">🖱</span> Click screen to zoom
        </span>
      </span>
      <span aria-hidden="true" class="flex items-center gap-2">
        <span
          class="inline-block h-2 w-2 rounded-full"
          style="
            background: radial-gradient(circle at 35% 30%, #d8f76e, #84b408);
            box-shadow: 0 0 6px rgba(165, 219, 19, 0.9);
          "
        />
        Track {{ active + 1 }} / {{ apps.length }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.console-fade-enter-active,
.console-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.console-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.console-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
