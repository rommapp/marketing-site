<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

defineProps<{
  githubStars: number;
}>();

// Replaced with the release number by the deploy workflow (sed on this file).
const version = "v<romm_version>";

const menuOpen = ref(false);

const navItems = [
  { label: "Docs", href: "https://docs.romm.app" },
  { label: "Demo", href: "https://demo.romm.app" },
  { label: "Contact", href: "mailto:contact@romm.app" },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-paper-card/95 backdrop-blur-md">
    <div class="rainbow-rule" aria-hidden="true" />
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between border-b-2 border-ink/10 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3">
        <a href="#" class="flex flex-row items-center gap-2">
          <img
            src="/images/blocks/logos/romm.svg"
            alt="RomM logo"
            class="h-8 w-8"
          />
          <span class="font-display text-2xl font-bold tracking-tight text-ink">
            RomM
          </span>
        </a>
        <a
          href="https://github.com/rommapp/romm/releases/latest"
          target="_blank"
          rel="noopener"
          class="hidden rounded-full border border-primary-300 bg-primary-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary-700 transition-colors hover:border-primary-500 sm:block"
        >
          {{ version }}
        </a>
      </div>

      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="font-display text-base font-bold text-ink-soft transition-colors hover:text-primary-600"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="https://opencollective.com/romm"
          target="_blank"
          rel="noopener"
          title="Support the project"
          class="hidden h-9 w-9 items-center justify-center rounded-lg border-2 border-ink/15 text-ink-soft transition-colors hover:border-tomato-500 hover:text-tomato-500 sm:flex"
        >
          <FontAwesomeIcon :icon="faHeart" class="h-3.5" />
        </a>
        <a
          href="https://discord.gg/RGPJHNMMwJ"
          target="_blank"
          rel="noopener"
          title="Join the Discord"
          class="hidden h-9 w-9 items-center justify-center rounded-lg border-2 border-ink/15 text-ink-soft transition-colors hover:border-grape-500 hover:text-grape-500 sm:flex"
        >
          <FontAwesomeIcon :icon="faDiscord" class="h-3.5" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          title="GitHub repository"
          class="flex h-9 items-center gap-2 rounded-lg border-2 border-ink px-3 font-mono text-xs font-bold text-ink shadow-plate-sm transition-colors hover:bg-sun-300"
        >
          <FontAwesomeIcon :icon="faGithub" class="h-4" />
          <span>{{ (githubStars / 1000).toFixed(1) }}K</span>
        </a>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink/15 text-ink md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" class="h-4" />
        </button>
      </div>
    </nav>

    <div
      v-if="menuOpen"
      class="border-b-2 border-ink/10 bg-paper-card md:hidden"
    >
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="block border-b border-ink/10 px-6 py-4 font-display text-base font-bold text-ink-soft last:border-b-0 hover:text-primary-600"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
