<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface AppImage {
  src: string;
  alt: string;
}

interface Tag {
  text: string;
  icon?: IconDefinition;
}

interface Spec {
  k: string;
  v: string;
}

defineProps<{
  name: string;
  logo: string;
  images: AppImage[];
  label: string;
  tags: Tag[];
  specs: Spec[];
  ctaText: string;
  ctaHref: string;
  reverse?: boolean;
}>();

const emit = defineEmits<{ select: [image: AppImage] }>();
</script>

<template>
  <div class="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
    <!-- Screenshot gallery -->
    <div :class="reverse ? 'lg:order-2' : ''">
      <AppGallery
        :images="images"
        :label="label"
        @select="emit('select', $event)"
      />
    </div>

    <!-- Spec panel -->
    <div
      :class="reverse ? 'lg:order-1' : ''"
      class="bevel-out group relative flex flex-col overflow-hidden border border-grid bg-ink-950 p-8 mb-5"
    >
      <!-- ghost logo watermark -->
      <img
        :src="logo"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute -right-8 -bottom-8 h-44 w-44 opacity-[0.05] transition-transform duration-500 group-hover:scale-110"
      />

      <!-- header -->
      <div class="relative flex items-center gap-4">
        <span class="bevel-out flex shrink-0 items-center justify-center">
          <img :src="logo" :alt="`${name} logo`" class="h-14 w-14" />
        </span>
        <div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag.text"
              class="inline-flex items-center gap-1.5 border border-grid px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-primary-300"
            >
              <FontAwesomeIcon v-if="tag.icon" :icon="tag.icon" class="h-2.5" />
              {{ tag.text }}
            </span>
          </div>
          <h3 class="font-pixel text-xl uppercase text-cream md:text-2xl">
            {{ name }}
          </h3>
        </div>
      </div>

      <!-- description (rich content via slot) -->
      <p class="relative mt-5 text-sm leading-relaxed text-muted">
        <slot />
      </p>

      <!-- spec sheet with dotted leaders -->
      <dl
        class="relative mt-6 border-t border-grid pt-5 font-mono text-xs leading-relaxed"
      >
        <div
          v-for="spec in specs"
          :key="spec.k"
          class="flex items-baseline gap-2 py-0.5"
        >
          <dt class="uppercase tracking-wider text-primary-300">
            {{ spec.k }}
          </dt>
          <span
            aria-hidden="true"
            class="flex-1 overflow-hidden whitespace-nowrap text-grid"
          >
            ..............................................
          </span>
          <dd class="text-right text-cream">{{ spec.v }}</dd>
        </div>
      </dl>

      <!-- CTA pinned to the bottom -->
      <a
        :href="ctaHref"
        target="_blank"
        rel="noopener"
        class="relative mt-8 inline-block"
      >
        <span class="btn-pixel">{{ ctaText }} ↗</span>
      </a>
    </div>
  </div>
</template>
