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
  <header class="sticky top-3 z-50 px-3 sm:px-6">
    <nav
      class="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 sm:px-5"
    >
      <div class="flex items-center gap-3">
        <a href="#" class="flex flex-row items-center gap-2.5">
          <img
            src="/images/blocks/logos/romm.svg"
            alt="RomM logo"
            class="h-8 w-8 drop-shadow-[0_2px_4px_rgba(0,137,199,0.4)]"
          />
          <span class="font-display text-lg tracking-tight text-ink">RomM</span>
        </a>
        <a
          href="https://github.com/rommapp/romm/releases/latest"
          target="_blank"
          rel="noopener"
          class="hidden rounded-full bg-primary-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary-700 transition-colors hover:bg-primary-200 sm:block"
        >
          {{ version }}
        </a>
      </div>

      <div class="hidden items-center gap-7 md:flex">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="font-tech text-sm font-bold uppercase tracking-[0.15em] text-ink-soft transition-colors hover:text-primary-600"
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
          class="glass-sm hidden h-9 w-9 items-center justify-center !rounded-full text-ink-soft transition-colors hover:text-magenta-500 sm:flex"
        >
          <FontAwesomeIcon :icon="faHeart" class="h-3.5" />
        </a>
        <a
          href="https://discord.gg/RGPJHNMMwJ"
          target="_blank"
          rel="noopener"
          title="Join the Discord"
          class="glass-sm hidden h-9 w-9 items-center justify-center !rounded-full text-ink-soft transition-colors hover:text-violet2-500 sm:flex"
        >
          <FontAwesomeIcon :icon="faDiscord" class="h-3.5" />
        </a>
        <a
          href="https://github.com/rommapp/romm"
          target="_blank"
          rel="noopener"
          title="GitHub repository"
          class="btn-gel !px-4 !py-1.5 !text-xs"
        >
          <FontAwesomeIcon :icon="faGithub" class="relative h-4" />
          <span class="relative">{{ (githubStars / 1000).toFixed(1) }}K</span>
        </a>
        <button
          type="button"
          class="glass-sm flex h-9 w-9 items-center justify-center !rounded-full text-ink md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <FontAwesomeIcon :icon="menuOpen ? faXmark : faBars" class="h-4" />
        </button>
      </div>
    </nav>

    <div
      v-if="menuOpen"
      class="glass mx-auto mt-2 max-w-6xl overflow-hidden !rounded-2xl md:hidden"
    >
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="block border-b border-white/60 px-6 py-4 font-tech text-sm font-bold uppercase tracking-[0.15em] text-ink-soft last:border-b-0 hover:text-primary-600"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
