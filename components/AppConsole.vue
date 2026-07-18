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

// One bright index-tab color per entry, cycled
const ACCENTS = [
  { tab: "bg-cerulean-500", chip: "bg-cerulean-500/15 text-cerulean-600" },
  { tab: "bg-kelly-500", chip: "bg-kelly-500/15 text-kelly-600" },
  { tab: "bg-tomato-500", chip: "bg-tomato-500/15 text-tomato-600" },
];

const active = ref(0);
const app = computed(() => props.apps[active.value]!);

// Attract mode: cycle entries until the visitor interacts, pause on hover
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

// Attract mode: advance to the next entry only once the active entry's
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
  <div class="plate overflow-hidden">
    <!-- Spine: title bar of the field guide -->
    <div
      class="flex items-center justify-between gap-3 border-b-[3px] border-ink bg-primary-600 px-5 py-3"
    >
      <span class="font-display text-lg font-bold tracking-wide text-white">
        A Field Guide to Your Devices
      </span>
      <span
        class="hidden font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary-200 sm:block"
      >
        Illustrated · Vol. 5
      </span>
    </div>

    <div
      class="grid bg-paper-card lg:grid-cols-[20rem_1fr]"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <!-- ======== Index tabs ======== -->
      <div
        role="tablist"
        aria-label="Choose an app"
        aria-orientation="vertical"
        class="relative flex flex-col border-b-2 border-ink/10 lg:border-b-0 lg:border-r-2"
        @keydown="onKeydown"
      >
        <div
          class="border-b border-ink/10 bg-paper px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink-faint"
        >
          Contents
        </div>

        <button
          v-for="(item, i) in apps"
          :key="item.id"
          type="button"
          role="tab"
          :aria-selected="i === active"
          class="group relative flex items-center gap-4 border-b border-ink/10 px-5 py-5 text-left transition-colors last:border-b-0"
          :class="i === active ? 'bg-primary-50' : 'hover:bg-paper'"
          @click="pick(i)"
          @focus="engage()"
        >
          <!-- colored index tab -->
          <span
            aria-hidden="true"
            class="absolute inset-y-2 left-0 w-1.5 rounded-r-full transition-opacity"
            :class="[
              ACCENTS[i % ACCENTS.length]!.tab,
              i === active ? 'opacity-100' : 'opacity-25',
            ]"
          />
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 bg-white transition-all duration-200"
            :class="
              i === active
                ? 'border-ink shadow-plate-sm'
                : 'border-ink/15 opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0'
            "
          >
            <img :src="item.logo" :alt="`${item.name} logo`" class="h-7 w-7" />
          </span>
          <span class="min-w-0 flex-1">
            <span
              class="block font-display text-lg font-bold leading-tight"
              :class="i === active ? 'text-ink' : 'text-ink-soft'"
            >
              {{ item.name }}
            </span>
            <span
              class="mt-0.5 block font-mono text-[9px] font-bold uppercase tracking-[0.25em]"
              :class="i === active ? 'text-primary-600' : 'text-ink-faint'"
            >
              {{ item.system }}
            </span>
          </span>
          <span
            aria-hidden="true"
            class="font-serif text-sm italic"
            :class="i === active ? 'text-primary-600' : 'text-ink-faint/50'"
          >
            p.{{ i + 1 }}
          </span>
        </button>

        <div
          aria-hidden="true"
          class="hidden flex-1 items-center justify-center px-5 py-5 font-serif text-sm italic text-ink-faint lg:flex"
        >
          — more entries every release —
        </div>
      </div>

      <!-- ======== Active entry ======== -->
      <Transition name="console-fade" mode="out-in">
        <div :key="app.id" class="grid xl:grid-cols-[1.15fr_1fr]">
          <!-- figure -->
          <div
            class="graph-paper relative border-b-2 border-ink/10 p-5 sm:p-7 xl:border-b-0 xl:border-r-2"
          >
            <AppGallery
              class="relative"
              :images="app.images"
              :label="app.label"
              @select="emit('select', $event)"
              @cycled="onGalleryCycled"
            />
          </div>

          <!-- entry text -->
          <div class="relative flex flex-col p-6 sm:p-8">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in app.tags"
                :key="tag.text"
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                :class="ACCENTS[active % ACCENTS.length]!.chip"
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
              class="mt-4 font-display text-2xl font-bold text-ink md:text-3xl"
            >
              {{ app.name }}
            </h3>

            <p class="mt-3 font-serif text-base leading-relaxed text-ink-soft">
              {{ app.body }}
            </p>

            <!-- link chips (e.g. supported firmwares) -->
            <div v-if="app.links" class="mt-4">
              <span
                class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink-faint"
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
                  class="rounded-md border border-ink/20 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-ink-soft transition-colors hover:border-primary-500 hover:text-primary-600"
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
              <span class="btn-cdrom">{{ app.ctaText }} →</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>

    <!-- reading hints -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-ink bg-paper px-5 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-ink-faint"
    >
      <span class="flex items-center gap-4">
        <span> <span class="text-primary-600">↑↓</span> Browse </span>
        <span> <span class="text-primary-600">⏎</span> Open </span>
        <span class="hidden sm:inline">
          <span class="text-primary-600">🖱</span> Click a figure to enlarge
        </span>
      </span>
      <span
        aria-hidden="true"
        class="font-serif normal-case italic tracking-normal"
      >
        Entry {{ active + 1 }} of {{ apps.length }}
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
