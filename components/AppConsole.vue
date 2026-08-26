<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
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
  links?: { items: { text: string; href: string }[] };
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

const tabEls = ref<HTMLButtonElement[]>([]);

const pick = (i: number, focus = false) => {
  engage();
  active.value = (i + props.apps.length) % props.apps.length;
  // Arrow keys move the selection, and the roving tabindex means focus has to
  // travel with it or the next keypress lands on a tab that is no longer -1.
  if (focus) tabEls.value[active.value]?.focus();
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
    pick(active.value + 1, true);
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    e.preventDefault();
    pick(active.value - 1, true);
  } else if (e.key === "Home") {
    e.preventDefault();
    pick(0, true);
  } else if (e.key === "End") {
    e.preventDefault();
    pick(props.apps.length - 1, true);
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
  <div class="flex flex-col">
    <div
      class="grid lg:grid-cols-[20rem_1fr]"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <!-- ======== Slot menu ======== -->
      <div
        role="tablist"
        aria-label="Choose an app"
        aria-orientation="vertical"
        class="relative flex flex-col overflow-hidden border-b border-grid lg:border-b-0 lg:border-r"
        @keydown="onKeydown"
      >
        <div
          class="border-b border-grid bg-ink-900 px-5 py-3 font-mono text-[10px] text-muted"
        >
          Select device
        </div>

        <button
          v-for="(item, i) in apps"
          :key="item.id"
          :ref="
            (el) => {
              if (el) tabEls[i] = el as HTMLButtonElement;
            }
          "
          type="button"
          role="tab"
          :id="`app-tab-${item.id}`"
          :aria-selected="i === active"
          :aria-controls="`app-panel-${item.id}`"
          :tabindex="i === active ? 0 : -1"
          class="group relative flex items-center gap-4 border-b border-grid px-5 py-5 text-left transition-colors last:border-b-0"
          :class="i === active ? 'bg-primary-500/10' : 'hover:bg-ink-900'"
          @click="pick(i)"
          @focus="engage()"
        >
          <!-- cursor -->
          <span
            aria-hidden="true"
            class="w-3 shrink-0 font-mono text-sm text-primary-400"
            :class="i === active ? 'blink' : 'opacity-0'"
          >
            ▶
          </span>
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center transition-opacity duration-200"
            :class="{ 'opacity-60 group-hover:opacity-100': i !== active }"
          >
            <img :src="item.logo" :alt="`${item.name} logo`" class="h-7 w-7" />
          </span>
          <span class="min-w-0">
            <span
              class="block font-pixel text-sm uppercase leading-tight"
              :class="i === active ? 'text-cream' : 'text-muted'"
            >
              {{ item.name }}
            </span>
            <span
              class="mt-1 block font-mono text-[9px] uppercase tracking-[0.25em]"
              :class="i === active ? 'text-primary-300' : 'text-muted'"
            >
              {{ item.system }}
            </span>
          </span>
          <!-- active edge -->
          <span
            aria-hidden="true"
            class="absolute inset-y-0 left-0 w-0.5 bg-primary-500 transition-opacity"
            :class="i === active ? 'opacity-100' : 'opacity-0'"
          />
        </button>

        <!-- filler slot, wink at empty cartridge bays -->
        <div
          aria-hidden="true"
          class="hidden flex-1 items-center justify-center gap-3 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted lg:flex"
        >
          Empty slot
        </div>
      </div>

      <!-- ======== Active slot ======== -->
      <Transition name="console-fade" mode="out-in">
        <div
          :key="app.id"
          :id="`app-panel-${app.id}`"
          role="tabpanel"
          :aria-labelledby="`app-tab-${app.id}`"
          class="grid xl:grid-cols-[1.15fr_1fr]"
        >
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
                class="inline-flex items-center gap-1.5 border border-grid px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-primary-300"
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
              class="mt-4 font-pixel text-xl uppercase text-cream md:text-2xl"
            >
              {{ app.name }}
            </h3>

            <p class="mt-4 text-sm leading-relaxed text-muted">
              {{ app.body }}
            </p>

            <!-- link chips (e.g. supported firmwares) -->
            <div v-if="app.links" class="mt-4">
              <span class="flex flex-wrap gap-1.5">
                <a
                  v-for="link in app.links.items"
                  :key="link.text"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  class="border border-grid px-2 py-0.5 font-mono text-[10px] text-cream transition-colors hover:border-primary-400 hover:text-primary-300"
                >
                  {{ link.text }}
                </a>
              </span>
            </div>

            <div class="mt-auto self-start pt-8">
              <a
                :href="app.ctaHref"
                target="_blank"
                rel="noopener"
                class="inline-block"
              >
                <span class="btn-pixel">
                  {{ app.ctaText }}
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- button hints -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t border-grid bg-ink-900 px-5 py-2.5 font-mono text-[9px] text-muted"
    >
      <span class="flex items-center gap-4">
        <span> <span class="text-primary-300">↑↓</span> Navigate </span>
        <span> <span class="text-primary-300">⏎</span> Launch </span>
        <span class="hidden items-center gap-1.5 sm:inline-flex">
          <FontAwesomeIcon
            :icon="faArrowPointer"
            class="h-2.5 text-primary-300"
          />
          Click screen to zoom
        </span>
      </span>
      <span aria-hidden="true"> Slot {{ active + 1 }}/{{ apps.length }} </span>
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
