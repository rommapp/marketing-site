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

// Attract mode: cycle slots until the visitor interacts, pause on hover
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

// Attract mode: advance to the next device only once the active device's
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
  <div class="bg-ink-950">
    <!-- panel chrome -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-b border-grid bg-gradient-to-b from-ink-700 to-ink-850 px-5 py-3 shadow-[inset_0_1px_0_rgba(233,239,251,0.12)]"
    >
      <span
        class="font-display text-[11px] uppercase tracking-[0.25em] text-chrome"
      >
        Device network
      </span>
      <span
        class="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyber-300"
      >
        <span aria-hidden="true" class="led led-on" />
        {{ apps.length }} clients online
      </span>
    </div>
    <div
      class="grid lg:grid-cols-[20rem_1fr]"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <!-- ======== Device menu ======== -->
      <div
        role="tablist"
        aria-label="Choose an app"
        aria-orientation="vertical"
        class="relative flex flex-col overflow-hidden border-b border-grid lg:border-b-0 lg:border-r"
        @keydown="onKeydown"
      >
        <div
          class="border-b border-grid bg-ink-900 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted"
        >
          Select device
        </div>

        <button
          v-for="(item, i) in apps"
          :key="item.id"
          type="button"
          role="tab"
          :aria-selected="i === active"
          class="group relative flex items-center gap-4 border-b border-grid px-5 py-5 text-left transition-colors last:border-b-0"
          :class="i === active ? 'bg-primary-950/40' : 'hover:bg-ink-900'"
          @click="pick(i)"
          @focus="engage()"
        >
          <!-- link status -->
          <span aria-hidden="true" class="flex w-3 shrink-0 justify-center">
            <span :class="i === active ? 'led led-on' : 'led bg-grid'" />
          </span>
          <span
            class="bevel-out flex h-11 w-11 shrink-0 items-center justify-center rounded border border-grid bg-ink-900 transition-all duration-200"
            :class="
              i === active
                ? 'border-cyber-400/70 shadow-[0_0_14px_rgba(76,201,255,0.25)]'
                : 'grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0'
            "
          >
            <img :src="item.logo" :alt="`${item.name} logo`" class="h-7 w-7" />
          </span>
          <span class="min-w-0">
            <span
              class="block font-display text-xs uppercase leading-tight"
              :class="i === active ? 'text-chrome' : 'text-muted'"
            >
              {{ item.name }}
            </span>
            <span
              class="mt-1 block text-[9px] font-semibold uppercase tracking-[0.25em]"
              :class="i === active ? 'text-cyber-300' : 'text-muted/60'"
            >
              {{ item.system }}
            </span>
          </span>
          <!-- active edge -->
          <span
            aria-hidden="true"
            class="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-cyber-400 to-primary-500 transition-opacity"
            :class="i === active ? 'opacity-100' : 'opacity-0'"
          />
        </button>

        <!-- filler slot, an open port awaiting its uplink -->
        <div
          aria-hidden="true"
          class="hidden flex-1 items-center justify-center gap-3 px-5 py-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted/50 lg:flex"
        >
          <span class="led border border-grid bg-transparent" />
          Port open · awaiting uplink
        </div>
      </div>

      <!-- ======== Active slot ======== -->
      <Transition name="console-fade" mode="out-in">
        <div :key="app.id" class="grid xl:grid-cols-[1.15fr_1fr]">
          <!-- screen -->
          <div
            class="relative border-b border-grid p-5 xl:border-b-0 xl:border-r sm:p-7"
          >
            <div aria-hidden="true" class="dot-grid absolute inset-0" />
            <AppGallery
              class="relative"
              :images="app.images"
              :label="app.label"
              @select="emit('select', $event)"
              @cycled="onGalleryCycled"
            />
          </div>

          <!-- readout -->
          <div class="relative flex flex-col p-6 sm:p-8">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in app.tags"
                :key="tag.text"
                class="bevel-out inline-flex items-center gap-1.5 rounded-full border border-grid bg-ink-900/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-cyber-300"
              >
                <FontAwesomeIcon
                  v-if="tag.icon"
                  :icon="tag.icon"
                  class="h-2.5"
                />
                {{ tag.text }}
              </span>
            </div>

            <h3
              class="mt-4 font-display text-lg uppercase text-chrome md:text-xl"
            >
              {{ app.name }}
            </h3>

            <p class="mt-4 text-sm leading-relaxed text-muted">
              {{ app.body }}
            </p>

            <!-- link chips (e.g. supported firmwares) -->
            <div v-if="app.links" class="mt-4">
              <span
                class="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted"
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
                  class="rounded border border-grid px-2 py-0.5 text-[10px] text-chrome transition-colors hover:border-cyber-400/70 hover:text-cyber-300"
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
              <span class="btn-chrome">{{ app.ctaText }} ↗</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>

    <!-- button hints -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t border-grid bg-ink-900 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-muted"
    >
      <span class="flex items-center gap-4">
        <span> <span class="text-cyber-300">↑↓</span> Navigate </span>
        <span> <span class="text-cyber-300">⏎</span> Launch </span>
        <span class="hidden sm:inline">
          <span class="text-cyber-300">🖱</span> Click screen to zoom
        </span>
      </span>
      <span aria-hidden="true" class="flex items-center gap-2">
        <span class="led led-on" />
        Link {{ active + 1 }}/{{ apps.length }}
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
